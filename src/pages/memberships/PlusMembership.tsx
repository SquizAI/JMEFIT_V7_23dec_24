import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Dumbbell, Salad, ArrowRight, CheckCircle } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import { Link } from 'react-router-dom';

const PlusMembership = () => {
  const features = [
    'Comprehensive Program – Combines everything from Trainer Feedback and Nutrition Only',
    'Custom Workout Plans – Tailored workouts designed for your fitness goals',
    'Custom Meal Plan – Personalized meal plan supporting your lifestyle',
    'Weekly Check-Ins – Progress checks and plan adjustments from Jaime',
    'Macro Coaching Guidebook – Detailed guide for nutrition understanding',
    'Grocery List – Comprehensive list for meal plan items',
    'Anytime Access – Message Jaime anytime for support',
    'Form Reviews – Continuous feedback on exercise technique'
  ];

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1950&q=80')",
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
              <h1 className="text-5xl font-bold mb-6">Plus Membership</h1>
              <p className="text-xl text-gray-300 mb-8">
                The ultimate transformation package combining personalized workouts and nutrition
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/shop/memberships">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#3dd8e8] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center gap-2"
                  >
                    Transform Your Life
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
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Star className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Complete Package</h3>
                <p className="text-gray-400">
                  Everything you need for a total transformation
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Dumbbell className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Custom Workouts</h3>
                <p className="text-gray-400">
                  Personalized training plans with video guidance
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Salad className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Nutrition Plans</h3>
                <p className="text-gray-400">
                  Custom meal plans and macro coaching
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <MessageCircle className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Direct Support</h3>
                <p className="text-gray-400">
                  Unlimited access to Jaime for guidance
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
              <h2 className="text-3xl font-bold mb-8">Everything You Get</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#3dd8e8] flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Program Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-lg mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Program Details</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  The workout part includes videos of each movement (in a library) for proper form guidance, with exact sets/reps and perceived exertion prescriptions. Track your weights and reps to monitor progress week over week. New splits every 4 weeks allow for progressive overload and strength development.
                </p>
                <p className="text-gray-300 mb-6">
                  For nutrition, you'll receive custom meal plans and macro targets based on your goals. Learn how to build sustainable eating habits that fit your lifestyle while achieving your body composition goals. Everything is customized according to your TDEE, measurements, and activity level.
                </p>
                <p className="text-gray-300">
                  Weekly check-ins ensure you're progressing optimally, with adjustments made to both training and nutrition as needed. You'll have direct access to Jaime for questions, form checks, and support throughout your journey.
                </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready for a Complete Transformation?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our comprehensive program and get everything you need to transform your body and lifestyle
              </p>
              <Link to="/shop/memberships">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#3dd8e8] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
                >
                  Start Your Transformation
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlusMembership;