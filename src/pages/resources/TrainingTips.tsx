import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TrainingTips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tips = [
    {
      title: 'Perfect Your Squat Form',
      category: 'technique',
      description: 'Essential tips for mastering proper squat mechanics',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Recovery Strategies',
      category: 'recovery',
      description: 'Optimize your rest days for better performance',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Training Tips</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              >
                <option value="all">All Categories</option>
                <option value="technique">Technique</option>
                <option value="recovery">Recovery</option>
                <option value="nutrition">Nutrition</option>
                <option value="mindset">Mindset</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{tip.title}</h3>
                    <Lightbulb className="w-6 h-6 text-[#3dd8e8]" />
                  </div>
                  <p className="text-gray-400 mb-4">{tip.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{tip.readTime} read</span>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="text-[#3dd8e8] flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainingTips;