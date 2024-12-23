import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Salad, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Packages: React.FC = () => {
  const packages = [
    {
      icon: <Trophy className="w-12 h-12 text-[#3dd8e8]" />,
      title: 'App Workouts Only - Self-Led',
      price: '$29.99/month',
      duration: 'Month-to-Month',
      level: 'Beginner to Advanced',
      description: 'Access to app-based workouts with video guidance and progress tracking.',
      keyFeatures: [
        'Access to JMEFit App',
        'Monthly Workout Updates',
        'Video Exercise Guides',
        'Progress Tracking',
        'No Long-Term Commitment'
      ]
    },
    {
      icon: <Salad className="w-12 h-12 text-[#3dd8e8]" />,
      title: 'Nutrition Only',
      price: '$199.99',
      duration: '12 Weeks',
      level: 'All Levels',
      description: 'Comprehensive nutrition coaching to transform your diet and lifestyle.',
      keyFeatures: [
        'One-on-One Coaching',
        'Custom Meal Plans',
        'Macro Coaching Guide',
        'Weekly Check-ins',
        'Ongoing Support'
      ]
    },
    {
      icon: <Dumbbell className="w-12 h-12 text-[#3dd8e8]" />,
      title: 'Plus Membership',
      price: '$349.99',
      duration: '12 Weeks',
      level: 'All Levels',
      description: 'Full transformation package combining personalized workouts and nutrition.',
      keyFeatures: [
        'Custom Workout Plans',
        'Nutrition Coaching',
        'Weekly Check-ins',
        'Form Reviews',
        'Priority Support'
      ]
    }
  ];

  return (
    <section id="packages" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Transform with Us</h2>
          <p className="text-gray-400 mb-8">Choose the perfect package for your fitness journey</p>
          <Link to="/questionnaire">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3dd8e8] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors inline-flex items-center gap-2"
            >
              Find Your Perfect Program
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-zinc-900 rounded-lg p-8 hover:bg-zinc-800 transition-colors"
            >
              <div className="mb-6">{pkg.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
              <div className="text-[#3dd8e8] text-2xl font-bold mb-4">{pkg.price}</div>
              <div className="text-purple-500 mb-4">
                <span className="mr-2">{pkg.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="ml-2">{pkg.level}</span>
              </div>
              <p className="text-gray-400 mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="mr-2 text-[#3dd8e8]">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={`/memberships/${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors inline-flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;