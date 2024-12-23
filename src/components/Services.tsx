import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, MessageCircle, Salad, Trophy, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Dumbbell className="w-12 h-12 text-[#3dd8e8]" />,
    title: 'App Workouts',
    description: 'Access expert-designed workouts with video guidance and progress tracking.',
    features: [
      'New workouts every month',
      'Choose 3-5 day splits',
      'Video exercise guides',
      'Progress tracking'
    ],
    link: '/programs/app-workouts'
  },
  {
    icon: <MessageCircle className="w-12 h-12 text-[#3dd8e8]" />,
    title: 'Trainer Support',
    description: 'Get personalized feedback and guidance directly from Jaime.',
    features: [
      'Form checks & feedback',
      'Direct messaging access',
      'Custom modifications',
      'Travel workout options'
    ],
    link: '/programs/trainer-support'
  },
  {
    icon: <Salad className="w-12 h-12 text-[#3dd8e8]" />,
    title: 'Nutrition Coaching',
    description: '12-week personalized nutrition coaching to transform your diet and lifestyle.',
    features: [
      'Custom meal plans',
      'Macro calculations',
      'Weekly check-ins',
      'Recipe suggestions'
    ],
    link: '/programs/nutrition'
  },
  {
    icon: <Trophy className="w-12 h-12 text-[#3dd8e8]" />,
    title: 'SHRED Program',
    description: '6-week intensive transformation program for rapid results.',
    features: [
      'Custom workouts',
      'Nutrition plan',
      'Daily support',
      'Progress tracking'
    ],
    link: '/programs/shred'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Transform Your Fitness Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our range of expert-designed programs and services to reach your goals faster
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black p-8 rounded-lg hover:bg-zinc-800/50 transition-colors group"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4 text-[#3dd8e8]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 text-[#3dd8e8] group-hover:text-[#34c5d3] transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/programs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3dd8e8] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors"
            >
              Browse Programs
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;