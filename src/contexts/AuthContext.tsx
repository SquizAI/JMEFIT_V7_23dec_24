import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { User } from '../types/auth';
import { getAuthErrorMessage, AUTH_ERRORS } from '../utils/auth-errors';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(session);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setUser(null);
        setError(getAuthErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        try {
          await fetchUserProfile(session.user.id);
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUser(null);
          setError(getAuthErrorMessage(err));
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('No profile found');

      setUser({
        id: userId,
        email: session?.user?.email || '',
        role: data.role,
        displayName: data.display_name
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(getAuthErrorMessage(err));
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    let userData = null;
    

    try {
      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) {
        throw error;
      }
      
      if (!user) {
        throw new Error('No user data returned');
      }

      // Set session first
      setSession(session);

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            display_name: user.email?.split('@')[0],
            role: 'user'
          }])
          .select()
          .single();

        if (createError) throw new Error('Failed to create user profile');
        
        userData = {
          id: user.id,
          email: user.email!,
          role: 'user',
          displayName: user.email?.split('@')[0] || ''
        };
      } else {
        userData = {
          id: user.id,
          email: user.email!,
          role: profile.role || 'user',
          displayName: profile.display_name
        };
      }

      // Set user state after all operations are complete
      setUser(userData);
      setError(null);
      
      return userData;
    } catch (err) {
      console.error('Sign in error:', err);
      setUser(null);
      setSession(null);
      throw new Error(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            role: 'user',
            avatar_url: null
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          throw new Error('Email already registered');
        }
        throw error;
      }

      if (!data?.user) throw new Error('Signup failed - no user returned');

      // Wait for profile creation
      let retries = 0;
      const maxRetries = 5;
      let profile;

      while (retries < maxRetries) {
        // Short delay before checking for profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && !profileError.message.includes('not found')) {
          throw profileError;
        }

        if (profileData) {
          profile = profileData;
          break;
        }

        retries++;
      }
      
      if (!profile) {
        throw new Error('Failed to create user profile');
      }

      setUser({
        id: data.user.id,
        email: data.user.email!,
        role: profile.role,
        displayName: profile.display_name
      });
      
      return data.user;
    } catch (error) {
      console.error('Signup error:', error instanceof Error ? error.message : error);
      throw new Error(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
      setError(getAuthErrorMessage(error));
      throw error;
    }
    setUser(null);
    setSession(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};