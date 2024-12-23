import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth';
import MainLayout from '../components/layouts/MainLayout';
import Logo from '../components/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await AuthService.resetPassword(email.trim());
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout className="flex items-center justify-center">
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900 rounded-lg p-8"
        >
          <div className="flex justify-center mb-8">
            <Logo className="w-32 h-auto" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-8 text-[#3dd8e8]">
            Reset Password
          </h2>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center">
              <div className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6">
                Check your email for password reset instructions
              </div>
              <Link
                to="/login"
                className="text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
              >
                Return to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </motion.button>

              <div className="text-center text-gray-400">
                Remember your password?{' '}
                <Link to="/login" className="text-[#3dd8e8] hover:text-[#34c5d3]">
                  Sign In
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;