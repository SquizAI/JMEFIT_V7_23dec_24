import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';

const CheckoutCancel = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-gray-400 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>
          <Link
            to="/checkout"
            className="inline-block bg-[#3dd8e8] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
          >
            Try Again
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CheckoutCancel;