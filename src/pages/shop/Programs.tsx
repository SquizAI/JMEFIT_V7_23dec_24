import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Dumbbell, Target, Clock, Users } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import { useCart } from '../../contexts/CartContext';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { dispatch } = useCart();

  const programs = [
    {
      id: 'shred-program',
      title: 'SHRED Program',
      category: 'transformation',
      description: '6-week intensive transformation program',
      price: 299.99,
      duration: '6 weeks',
      difficulty: 'intermediate',
      commitment: '5-6 days/week',
      features: [
        'Customized workout plans',
        'Nutrition guidance',
        'Weekly check-ins',
        'Progress tracking',
        'Form check videos',
        'Support via messaging'
      ],
      requirements: [
        'Basic fitness level',
        'Access to gym equipment',
        'Commitment to 5 workouts per week',
        'Ability to track nutrition'
      ],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'strength-mastery',
      title: 'Strength Mastery',
      category: 'strength',
      description: 'Comprehensive strength training program',
      price: 199.99,
      duration: '12 weeks',
      difficulty: 'advanced',
      commitment: '4-5 days/week',
      features: [
        'Periodized strength program',
        'Progressive overload plans',
        'Form technique videos',
        '1RM calculator',
        'Recovery protocols',
        'Mobility work'
      ],
      requirements: [
        '1 year of consistent training',
        'Familiarity with compound lifts',
        'Access to full gym equipment',
        'Ability to train 4-5 times per week'
      ],
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'hypertrophy-blueprint',
      title: 'Hypertrophy Blueprint',
      category: 'hypertrophy',
      description: 'Muscle building focused program',
      price: 249.99,
      duration: '16 weeks',
      difficulty: 'intermediate',
      commitment: '4-5 days/week',
      features: [
        'Volume-based training',
        'Nutrition for muscle gain',
        'Supplement guidance',
        'Progress photos review',
        'Monthly adjustments',
        '24/7 chat support'
      ],
      requirements: [
        '6 months training experience',
        'Access to gym equipment',
        'Ability to track macros',
        'Commitment to recovery'
      ],
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleAddToCart = (program: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: program.id,
        productId: program.id,
        title: program.title,
        price: program.price,
        quantity: 1,
        image: program.image
      }
    });
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Choose the perfect program to achieve your fitness goals with expert guidance and proven methods
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Program Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-4 px-4">Program</th>
                    <th className="text-left py-4 px-4">Best For</th>
                    <th className="text-left py-4 px-4">Duration</th>
                    <th className="text-left py-4 px-4">Commitment</th>
                    <th className="text-left py-4 px-4">Experience Level</th>
                    <th className="text-right py-4 px-4">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer`}
                      onClick={() => {
                        const element = document.getElementById(program.id);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <td className="py-4 px-4 font-semibold">{program.title}</td>
                      <td className="py-4 px-4 text-gray-400">
                        {program.category === 'transformation' && 'Fat Loss & Muscle Definition'}
                        {program.category === 'strength' && 'Raw Strength & Power'}
                        {program.category === 'hypertrophy' && 'Muscle Growth'}
                      </td>
                      <td className="py-4 px-4">{program.duration}</td>
                      <td className="py-4 px-4">{program.commitment}</td>
                      <td className="py-4 px-4 capitalize">{program.difficulty}</td>
                      <td className="py-4 px-4 text-right text-[#3dd8e8] font-bold">${program.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] min-w-[300px]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            >
              <option value="all">All Categories</option>
              <option value="transformation">Transformation</option>
              <option value="strength">Strength</option>
              <option value="hypertrophy">Hypertrophy</option>
            </select>
          </div>

          <div className="grid gap-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                id={program.id}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">{program.title}</h3>
                        <p className="text-gray-400 mb-4">{program.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-[#3dd8e8]">
                        ${program.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#3dd8e8]" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#3dd8e8]" />
                        <span className="capitalize">{program.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#3dd8e8]" />
                        <span>{program.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-[#3dd8e8]" />
                        <span className="capitalize">{program.category}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2">Features</h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                              <span className="w-1.5 h-1.5 bg-[#3dd8e8] rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <ul className="space-y-2">
                          {program.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                              <span className="w-1.5 h-1.5 bg-[#3dd8e8] rounded-full"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(program)}
                      className="flex items-center gap-2 bg-[#3dd8e8] text-black px-6 py-3 rounded-lg font-semibold"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Programs;