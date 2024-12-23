import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Video, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import { Link } from 'react-router-dom';

const AppWorkouts = () => {
  const features = [
    'Access to "JMEFit" App – Full access to Jaime Fit\'s app-based workouts',
    'New Monthly Workouts – Choose from 3, 4, or 5-day workout plans updated each month',
    'Structured Progressions – Programmed progressions to ensure continuous improvement',
    'Video Guidance – Each exercise is paired with instructional videos and setup/execution breakdown',
    'Detailed Prescriptions – Includes prescribed sets, reps, RPE, and rest times',
    'Workout Logging – Record weights, reps, and notes directly within the app',
    'No Long-Term Commitment – Month-to-month membership with flexibility to cancel'
  ];

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1950&q=80')",
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
              <h1 className="text-5xl font-bold mb-6">App Workouts</h1>
              <p className="text-xl text-gray-300 mb-8">
                Transform your fitness journey with expert-designed workouts, video guidance, and progress tracking
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/shop/memberships">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#3dd8e8] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center gap-2"
                  >
                    Get Started Now
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
                <Dumbbell className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Expert Programming</h3>
                <p className="text-gray-400">
                  Professional workout plans designed to maximize your results
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Video className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Video Guidance</h3>
                <p className="text-gray-400">
                  Clear video demonstrations for proper form and technique
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900 p-8 rounded-lg"
              >
                <Calendar className="w-12 h-12 text-[#3dd8e8] mb-6" />
                <h3 className="text-xl font-semibold mb-4">Monthly Updates</h3>
                <p className="text-gray-400">
                  Fresh workouts every month to keep you challenged and motivated
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

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of members who have already transformed their fitness journey with our app-based workouts
              </p>
              <Link to="/shop/memberships">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#3dd8e8] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
                >
                  Start Your Journey
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AppWorkouts;