import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Dumbbell } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';

const WorkoutLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const workouts = [
    {
      title: 'Full Body HIIT',
      category: 'cardio',
      duration: '30 min',
      difficulty: 'intermediate',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Upper Body Strength',
      category: 'strength',
      duration: '45 min',
      difficulty: 'advanced',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
    },
    // Add more workouts as needed
  ];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workout.category === selectedCategory;
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Workout Library</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workouts..."
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
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="mobility">Mobility</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{workout.title}</h3>
                    <Dumbbell className="w-6 h-6 text-[#3dd8e8]" />
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span>{workout.duration}</span>
                    <span>•</span>
                    <span className="capitalize">{workout.difficulty}</span>
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

export default WorkoutLibrary;