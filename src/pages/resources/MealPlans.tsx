import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Salad, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';

const MealPlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('all');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const mealPlans = [
    {
      id: 'weight-loss',
      title: 'Weight Loss Meal Plan',
      goal: 'weight-loss',
      calories: '1800-2000',
      meals: [
        {
          time: 'Breakfast',
          options: [
            'Protein oatmeal with berries',
            'Greek yogurt parfait',
            'Egg white omelet with vegetables'
          ]
        },
        {
          time: 'Lunch',
          options: [
            'Grilled chicken salad',
            'Turkey wrap with avocado',
            'Quinoa bowl with tofu'
          ]
        },
        {
          time: 'Dinner',
          options: [
            'Baked salmon with vegetables',
            'Lean beef stir-fry',
            'White fish with sweet potato'
          ]
        }
      ],
      macros: {
        protein: '40%',
        carbs: '30%',
        fats: '30%'
      }
    },
    {
      id: 'muscle-gain',
      title: 'Muscle Building Plan',
      goal: 'muscle-gain',
      calories: '3000-3200',
      meals: [
        {
          time: 'Breakfast',
          options: [
            'Protein pancakes with banana',
            'Egg and oatmeal bowl',
            'Mass gainer smoothie'
          ]
        },
        {
          time: 'Lunch',
          options: [
            'Chicken rice bowl',
            'Tuna pasta salad',
            'Turkey and sweet potato'
          ]
        },
        {
          time: 'Dinner',
          options: [
            'Steak with potatoes',
            'Salmon with quinoa',
            'Chicken with rice'
          ]
        }
      ],
      macros: {
        protein: '30%',
        carbs: '50%',
        fats: '20%'
      }
    }
  ];

  const filteredPlans = mealPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = selectedGoal === 'all' || plan.goal === selectedGoal;
    return matchesSearch && matchesGoal;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">Meal Plans</h1>
          <p className="text-xl text-gray-400 mb-12">
            Structured meal plans designed to help you reach your fitness goals
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search meal plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              />
            </div>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            >
              <option value="all">All Goals</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{plan.title}</h3>
                      <div className="flex items-center gap-4 text-gray-400 mt-2">
                        <div className="flex items-center gap-1">
                          <Salad className="w-4 h-4" />
                          <span>{plan.calories} calories</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>3 meals/day</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      className="p-2 hover:bg-zinc-800 rounded-lg"
                    >
                      {expandedPlan === plan.id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {expandedPlan === plan.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-zinc-800 pt-4 mt-4"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-4">Daily Meals</h4>
                          <div className="space-y-4">
                            {plan.meals.map((meal, index) => (
                              <div key={index}>
                                <h5 className="font-medium text-[#3dd8e8] mb-2">{meal.time}</h5>
                                <ul className="space-y-2">
                                  {meal.options.map((option, idx) => (
                                    <li key={idx} className="text-gray-400 text-sm">
                                      • {option}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4">Macro Distribution</h4>
                          <div className="space-y-4">
                            {Object.entries(plan.macros).map(([macro, value]) => (
                              <div key={macro} className="flex justify-between items-center">
                                <span className="capitalize">{macro}</span>
                                <span className="text-[#3dd8e8]">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default MealPlans;