import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <Search className="w-16 h-16 text-[#3dd8e8] mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3dd8e8] text-black px-6 py-3 rounded-lg font-semibold"
              >
                Return Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default NotFound;