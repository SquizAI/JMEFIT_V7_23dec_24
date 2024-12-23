import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuestionnaireFallback = () => {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Unable to Generate Recommendation</h1>
          <p className="text-gray-400 mb-8">
            We're having trouble generating a personalized recommendation right now. 
            You can explore our programs directly or contact us for assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop/memberships">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-[#3dd8e8] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
              >
                Browse Programs
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
              >
                Get Help
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestionnaireFallback;