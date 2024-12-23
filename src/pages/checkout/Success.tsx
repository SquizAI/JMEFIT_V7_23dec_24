import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import MainLayout from '../../components/layouts/MainLayout';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const { dispatch } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [sessionId, dispatch]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#3dd8e8] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CheckoutSuccess;