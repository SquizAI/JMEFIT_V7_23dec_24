import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { db } from '../../../db';

const MealManager = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const results = await db.all('SELECT * FROM meals ORDER BY created_at DESC');
        setMeals(results);
      } catch (error) {
        console.error('Error loading meals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, []);

  const filteredMeals = meals.filter(meal => 
    meal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Meal Management</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Meal
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3dd8e8] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading meals...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >
              {meal.image_url && (
                <img
                  src={meal.image_url}
                  alt={meal.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{meal.title}</h3>
                <p className="text-gray-400 mb-4">{meal.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Calories</p>
                    <p className="font-semibold">{meal.calories}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Protein</p>
                    <p className="font-semibold">{meal.protein}g</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Carbs</p>
                    <p className="font-semibold">{meal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Fats</p>
                    <p className="font-semibold">{meal.fats}g</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealManager;