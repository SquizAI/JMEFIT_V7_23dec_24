import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Check, X } from 'lucide-react';
import { CheckoutService } from '../../services/checkout';

interface CouponFormProps {
  onApply: (discount: number) => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ onApply }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const coupon = await CheckoutService.validateCoupon(code);
      setSuccess(`${coupon.discount}% discount applied!`);
      onApply(coupon.discount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="w-full pl-10 pr-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading || !code.trim()}
          className="px-4 py-2 bg-[#3dd8e8] text-black rounded-lg font-semibold disabled:opacity-50"
        >
          Apply
        </motion.button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-green-500 text-sm">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}
    </form>
  );
};

export default CouponForm;