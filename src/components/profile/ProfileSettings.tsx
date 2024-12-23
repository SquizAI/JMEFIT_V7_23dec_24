import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Scale, Ruler, Calendar } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import MeasurementsForm from './MeasurementsForm';
import PreferencesForm from './PreferencesForm';
import GoalsForm from './GoalsForm';

const ProfileSettings = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [activeTab, setActiveTab] = useState('profile');

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3dd8e8]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-8 text-center">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-gray-400 p-8 text-center">
        Profile not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      <div className="flex gap-4 mb-8">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'measurements', label: 'Measurements', icon: Scale },
          { id: 'goals', label: 'Goals', icon: Target },
          { id: 'preferences', label: 'Preferences', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#3dd8e8] text-black'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-zinc-900 rounded-lg p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => updateProfile({ displayName: e.target.value })}
                className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio || ''}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] h-32 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        )}

        {activeTab === 'measurements' && (
          <MeasurementsForm />
        )}

        {activeTab === 'goals' && (
          <GoalsForm />
        )}

        {activeTab === 'preferences' && (
          <PreferencesForm />
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;