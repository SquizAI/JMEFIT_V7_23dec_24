import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, Book, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { useProfile } from '../contexts/ProfileContext';
import OrderHistory from './dashboard/OrderHistory';
import MainLayout from './layouts/MainLayout';

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (profileLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3dd8e8]"></div>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-400">Profile not found</div>
        </div>
      </MainLayout>
    );
  }
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <span className="text-gray-400">Welcome, {profile.displayName}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Activity className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Workout Progress</h2>
              <p className="text-gray-400">Track your fitness journey</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Calendar className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Schedule</h2>
              <p className="text-gray-400">View upcoming sessions</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Book className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nutrition Log</h2>
              <p className="text-gray-400">Track your meals and macros</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 p-6 rounded-lg"
            >
              <Settings className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p className="text-gray-400">Manage your account</p>
            </motion.div>
          </div>

          <div className="mt-12 bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <OrderHistory />
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">Workout Completed</h3>
                    <p className="text-gray-400">Upper Body Strength</p>
                  </div>
                  <span className="text-gray-400">2 days ago</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;