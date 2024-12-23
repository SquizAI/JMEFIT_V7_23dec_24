import React from 'react';
import { motion } from 'framer-motion';
import { Salad, MessageCircle, Book, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import { Link } from 'react-router-dom';

const NutritionOnly = () => {
  const features = [
    'One-on-One Coaching – Work directly with Jaime throughout the 12 weeks',
    'Anytime Messaging – Communicate with Jaime through the app for ongoing support',
    'Custom Meal Plans – Tailored to individual goals, preferences, and health restrictions',
    'Macro Coaching Guidebook – Comprehensive guide explaining macronutrients and tracking',
    'Weekly Check-Ins – Receive weekly feedback and plan adjustments based on progress',
    'Grocery List – Detailed grocery list aligned with your custom meal plan',
    'Adaptive Adjustments – Macros and meals adjusted based on feedback and results'
  ];

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=1950&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/70" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-6">Nutrition Coaching</h1>
              <p className="text-xl text-gray-300 mb-8">
                Transform your relationship with food through personalized nutrition coaching
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/shop/memberships">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#3dd8e8] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center gap-2"
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Salad className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Custom Meal Plans</h3>
                <p className="text-gray-400">
                  Personalized nutrition plans tailored to your goals and preferences
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <MessageCircle className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">1:1 Support</h3>
                <p className="text-gray-400">
                  Direct access to Jaime for guidance and accountability
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Book className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Macro Guide</h3>
                <p className="text-gray-400">
                  Comprehensive guide to understanding and tracking macros
                </p>
              </motion.div>
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-lg mb-16"
            >
              <h2 className="text-3xl font-bold mb-8">Program Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#3dd8e8] flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Who Is This For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-lg mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Who Is This For?</h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn't real life and you never learn how to eat at any place at anytime, however this will give you a starting point and lots of ideas!

                I do macro/nutrition personalization and ongoing coaching/macro manipulation when it's time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life.

                Everything is customized according to your TDEE, height, weight and BF%, and activity level. The goal (once desired body fat % is achieved) is to roll into a reverse diet and add calories (macros) back in slowly with very little weight gain. At this point, maintenance or recomp phases are the typical next step before entering another deficit.
              </p>
            </motion.div>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Nutrition?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our nutrition coaching program and learn how to fuel your body for optimal results
              </p>
              <Link to="/shop/memberships">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#3dd8e8] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
                >
                  Get Started Today
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NutritionOnly;