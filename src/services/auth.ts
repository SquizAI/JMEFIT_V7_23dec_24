import { supabase } from '../lib/supabase';
import type { User } from '../types/auth';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AuthService = {
  async signUp(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0],
            role: 'user'
          }
        }
      });

      if (error) throw new AuthError(error.message);
      if (!user) throw new AuthError('No user data returned');

      return {
        id: user.id,
        email: user.email!,
        role: 'user',
        displayName: displayName || email.split('@')[0]
      };
    } catch (err) {
      console.error('Signup error:', err);
      throw new AuthError('Failed to create account');
    }
  },

  async signIn(email: string, password: string): Promise<User> {
    try {
      // Validate inputs
      if (!email?.trim() || !password?.trim()) {
        throw new AuthError('Email and password are required');
      }

      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) throw new AuthError(error.message);
      if (!user) throw new AuthError('No user data returned');

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Handle missing profile
      if (profileError && profileError.code === 'PGRST116') {
        console.log('Creating new profile for user:', user.id);
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            display_name: user.email?.split('@')[0],
            role: 'user'
          }])
          .select()
          .single();

        if (createError) {
          console.error('Profile creation error:', createError);
          throw new AuthError('Failed to create user profile');
        }

        if (!newProfile) {
          throw new AuthError('Profile creation failed');
        }

        return {
          id: user.id,
          email: user.email!,
          role: newProfile.role,
          displayName: newProfile.display_name
        };
      }

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new AuthError('Failed to load user profile');
      }

      if (!profile) {
        console.error('No profile found for user:', user.id);
        throw new AuthError('No profile found');
      }

      return {
        id: user.id,
        email: user.email!,
        role: profile.role || 'user',
        displayName: profile.display_name
      };
    } catch (err) {
      console.error('Sign in error:', err);
      if (err instanceof AuthError) {
        throw err;
      }
      throw new AuthError('Failed to sign in. Please try again.');
    }
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      if (!session?.user) return null;

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) throw new AuthError(profileError.message);

      return {
        id: session.user.id,
        email: session.user.email!,
        role: profile.role || 'user',
        displayName: profile.display_name
      };
    } catch (err) {
      console.error('Get current user error:', err);
      return null;
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
        captchaToken: undefined
      });
      
      if (error) throw error;
    } catch (err) {
      console.error('Reset password error:', err);
      throw new AuthError('Failed to send reset email');
    }
  },

  async updatePassword(newPassword: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
    } catch (err) {
      console.error('Update password error:', err);
      throw new AuthError('Failed to update password');
    }
  },

  onAuthChange(callback: (user: User | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) throw profileError;

            const user: User = {
              id: session.user.id,
              email: session.user.email!,
              role: profile.role || 'user',
              displayName: profile.display_name
            };
            callback(user);
          } catch (err) {
            console.error('Auth change error:', err);
            callback(null);
          }
        } else {
          callback(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }
};