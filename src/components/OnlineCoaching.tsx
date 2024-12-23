import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, MessageCircle, Video, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnlineCoaching: React.FC = () => {
  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Custom Workout Plans',
      description: 'Personalized training programs designed for your goals and schedule.',
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#3dd8e8]" />,
      title: '24/7 Coach Support',
      description: 'Direct access to your coach for guidance and motivation.',
    },
    {
      icon: <Video className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Video Analysis',
      description: 'Form check and technique improvements through video feedback.',
    },
    {
      icon: <Target className="w-8 h-8 text-[#3dd8e8]" />,
      title: 'Goal Achievement',
      description: 'Structured plans and accountability to reach your goals faster.',
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Expert Online Coaching</h2>
          <p className="text-gray-400">Transform your fitness journey with personalized guidance</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/programs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#3dd8e8] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors"
            >
              View Training Programs
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineCoaching;