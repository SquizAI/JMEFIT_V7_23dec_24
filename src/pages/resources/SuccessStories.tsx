import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SuccessStories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stories = [
    {
      name: 'Sarah M.',
      category: 'weight-loss',
      achievement: 'Lost 30 lbs and gained confidence',
      duration: '6 months',
      beforeImage: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1579047440583-43a690fe2243?auto=format&fit=crop&w=800&q=80',
      testimonial: 'The program completely transformed my approach to fitness and nutrition.'
    },
    {
      name: 'John D.',
      category: 'muscle-gain',
      achievement: 'Gained 15 lbs of muscle',
      duration: '8 months',
      beforeImage: 'https://images.unsplash.com/photo-1543975200-8e313fb04fc7?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=800&q=80',
      testimonial: 'The structured approach and expert guidance made all the difference.'
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.achievement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
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
            <h1 className="text-4xl font-bold">Success Stories</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stories..."
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
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="strength">Strength</option>
                <option value="endurance">Endurance</option>
              </select>
            </div>
          </div>

          <div className="grid gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{story.name}</h3>
                      <div className="flex items-center gap-4 text-gray-400">
                        <Trophy className="w-5 h-5 text-[#3dd8e8]" />
                        <span>{story.achievement}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {story.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Before</p>
                      <img
                        src={story.beforeImage}
                        alt={`${story.name} before`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">After</p>
                      <img
                        src={story.afterImage}
                        alt={`${story.name} after`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <blockquote className="text-gray-400 italic">
                    "{story.testimonial}"
                  </blockquote>
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

export default SuccessStories;