import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CheckoutFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, loading }) => {
  const { user } = useAuth();
  const [checkoutType, setCheckoutType] = useState<'guest' | 'login' | 'signup'>(
    user ? 'login' : 'guest'
  );
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.displayName || '',
    password: '',
    confirmPassword: '',
    saveInfo: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...formData, checkoutType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!user && (
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setCheckoutType('guest')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              checkoutType === 'guest'
                ? 'bg-[#3dd8e8] text-black'
                : 'bg-zinc-900 text-gray-400'
            }`}
          >
            Guest Checkout
          </button>
          <button
            type="button"
            onClick={() => setCheckoutType('login')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              checkoutType === 'login'
                ? 'bg-[#3dd8e8] text-black'
                : 'bg-zinc-900 text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setCheckoutType('signup')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              checkoutType === 'signup'
                ? 'bg-[#3dd8e8] text-black'
                : 'bg-zinc-900 text-gray-400'
            }`}
          >
            Sign Up
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>
      </div>

      {(checkoutType === 'guest' || checkoutType === 'signup') && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              required
            />
          </div>
        </div>
      )}

      {(checkoutType === 'login' || checkoutType === 'signup') && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              required={checkoutType !== 'guest'}
            />
          </div>
        </div>
      )}

      {checkoutType === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              required={checkoutType === 'signup'}
            />
          </div>
        </div>
      )}

      {checkoutType === 'guest' && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveInfo"
            checked={formData.saveInfo}
            onChange={(e) => setFormData({ ...formData, saveInfo: e.target.checked })}
            className="rounded border-gray-400 text-[#3dd8e8] focus:ring-[#3dd8e8]"
          />
          <label htmlFor="saveInfo" className="text-sm text-gray-400">
            Save my information for faster checkout next time
          </label>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Continue to Payment
          </div>
        )}
      </motion.button>
    </form>
  );
};

export default CheckoutForm;