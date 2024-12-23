import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock } from 'lucide-react';
import MainLayout from '../components/layouts/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">About JME FIT</h1>
          <p className="text-xl text-gray-400 mb-12">
            Transforming lives through expert fitness guidance and personalized coaching
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <Users className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-gray-400">Certified professionals dedicated to your success</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <Award className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-400">Hundreds of successful transformations</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <Clock className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400">Always here to guide and motivate you</p>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-400 mb-6">
              Founded with a passion for transforming lives through fitness, JME FIT has grown into a
              community of dedicated trainers and motivated individuals working together to achieve
              their fitness goals.
            </p>
            <p className="text-gray-400">
              Our approach combines expert knowledge, personalized attention, and cutting-edge
              training methods to deliver results that last. We believe in not just transforming
              bodies, but also empowering minds and building lasting healthy habits.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-400">
              To empower individuals with the knowledge, tools, and support they need to achieve
              their fitness goals and maintain a healthy lifestyle for life. We're committed to
              making expert fitness guidance accessible to everyone, anywhere.
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default About;