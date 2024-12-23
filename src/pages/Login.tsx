import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { getAuthErrorMessage } from '../utils/auth-errors';
import MainLayout from '../components/layouts/MainLayout';
import Logo from '../components/Logo';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const { refreshProfile } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const from = location.state?.from?.pathname || '/dashboard';

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const userData = await signIn(credentials.email.trim(), credentials.password.trim());      
      await refreshProfile(); // Refresh profile after successful login
      setSuccess(true);
      
      // Only navigate if we have user data
      if (userData) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(getAuthErrorMessage(err));
      setSuccess(false);
    } finally {
      setLoading(false); // Always set loading to false
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
          <h2 className="text-2xl font-bold text-center mb-4 text-[#3dd8e8]">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Sign in to access your account
          </p>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
              className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#3dd8e8] hover:text-[#34c5d3]">
              Sign Up
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link 
              to="/forgot-password"
              className="text-sm text-gray-400 hover:text-[#3dd8e8]"
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Login;