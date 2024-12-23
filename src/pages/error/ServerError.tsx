import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';

const ServerError = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Server Error</h1>
          <p className="text-gray-400 mb-8">
            Something went wrong on our end. Please try again later or contact support if the problem persists.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-[#3dd8e8] text-black px-6 py-3 rounded-lg font-semibold mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Retry
          </motion.button>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ServerError;