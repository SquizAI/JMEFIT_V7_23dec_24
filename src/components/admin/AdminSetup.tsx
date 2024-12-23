import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { AuthService } from '../../services/auth';

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const setupAdmin = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Create admin account with default credentials
      await AuthService.signUp('admin@jmefit.com', 'admin123', 'Admin User');
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to create admin account. It might already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900 rounded-lg p-8"
      >
        <div className="flex justify-center mb-8">
          <Lock className="w-16 h-16 text-[#3dd8e8]" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-[#3dd8e8]">
          Admin Setup
        </h2>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">Admin account created successfully!</p>
            <p className="text-gray-400 mb-2">Login credentials:</p>
            <p className="text-gray-400">Email: admin@jmefit.com</p>
            <p className="text-gray-400">Password: admin123</p>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={setupAdmin}
            disabled={loading}
            className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Create Admin Account
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default AdminSetup;