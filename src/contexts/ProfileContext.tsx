import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { ProfileService } from '../services/profile';
import type { UserProfile } from '../types/profile';

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addMeasurement: (measurement: any) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async (userId: string) => {
    try {
      const data = await ProfileService.getProfile(userId);
      setProfile(data);
      setError(null);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadProfile(user.id);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedProfile = await ProfileService.updateProfile(user.id, data);
      setProfile(updatedProfile);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addMeasurement = async (measurement: any) => {
    if (!user) return;
    
    try {
      await ProfileService.addMeasurement(user.id, measurement);
      await loadProfile(user.id);
    } catch (err) {
      console.error('Error adding measurement:', err);
      throw err;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    await loadProfile(user.id);
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        profile, 
        loading, 
        error, 
        updateProfile, 
        addMeasurement,
        refreshProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};