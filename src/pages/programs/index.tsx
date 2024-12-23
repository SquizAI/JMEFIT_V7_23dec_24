import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, MessageCircle, Salad, Trophy, ArrowRight } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';

const Programs = () => {
  const programs = [
    {
      title: 'SHRED Program',
      description: '6-week intensive transformation program for rapid results',
      icon: Trophy,
      path: '/programs/shred',
      features: [
        'Custom workouts',
        'Nutrition plan',
        'Daily support',
        'Progress tracking'
      ],
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'App Workouts',
      description: 'Access expert-designed workouts with video guidance',
      icon: Dumbbell,
      path: '/programs/app-workouts',
      features: [
        'New workouts monthly',
        'Video guides',
        'Progress tracking',
        'Choose your split'
      ],
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Trainer Support',
      description: 'Get personalized feedback and guidance from Jaime',
      icon: MessageCircle,
      path: '/programs/trainer-support',
      features: [
        'Form checks',
        'Direct messaging',
        'Custom modifications',
        'Travel workouts'
      ],
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Nutrition Coaching',
      description: 'Expert nutrition guidance for optimal results',
      icon: Salad,
      path: '/programs/nutrition',
      features: [
        'Custom meal plans',
        'Macro guidance',
        'Weekly check-ins',
        'Recipe suggestions'
      ],
      color: 'bg-[#3dd8e8]/20 text-[#3dd8e8]'
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Training Programs</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from our range of expert-designed programs to achieve your fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${program.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{program.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6">{program.description}</p>

                  <ul className="space-y-3 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3dd8e8]"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to={program.path}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-[#3dd8e8] font-semibold"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Programs;