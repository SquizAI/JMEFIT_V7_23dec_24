import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import type { User } from '../../types/auth';
import { getAuthErrorMessage, AUTH_ERRORS } from '../../utils/auth-errors';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }

    setUser({
      id: userId,
      email: session?.user?.email || '',
      role: data.role,
      displayName: data.display_name
    });
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
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

      if (error) throw error;
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
        throw new Error(AUTH_ERRORS.PROFILE_CREATION_FAILED);
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
    setUser(null);
    setSession(null);
    if (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut 
    }}>
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