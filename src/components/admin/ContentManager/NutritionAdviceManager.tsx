import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Apple } from 'lucide-react';
import { db } from '../../../db';

const NutritionAdviceManager = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const loadAdvice = async () => {
      try {
        const results = await db.all('SELECT * FROM nutrition_advice ORDER BY created_at DESC');
        setAdvice(results);
      } catch (error) {
        console.error('Error loading nutrition advice:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdvice();
  }, []);

  const filteredAdvice = advice.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Nutrition Advice</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Advice
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search advice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-zinc-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="macros">Macros</option>
          <option value="supplements">Supplements</option>
          <option value="timing">Timing</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3dd8e8] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading nutrition advice...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvice.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <Apple className="w-6 h-6 text-[#3dd8e8]" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-500 mb-4">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <p className="text-gray-400 whitespace-pre-wrap">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NutritionAdviceManager;