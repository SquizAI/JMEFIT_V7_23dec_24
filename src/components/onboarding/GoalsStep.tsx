import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingDown, Dumbbell, Timer } from 'lucide-react';

interface GoalsStepProps {
  onSelect: (goals: string[]) => void;
  selectedGoals: string[];
}

const goals = [
  {
    id: 'weight-loss',
    label: 'Weight Loss',
    icon: TrendingDown,
    description: 'Lose fat and improve body composition'
  },
  {
    id: 'muscle-gain',
    label: 'Build Muscle',
    icon: Dumbbell,
    description: 'Gain muscle mass and strength'
  },
  {
    id: 'strength',
    label: 'Get Stronger',
    icon: Target,
    description: 'Improve overall strength and power'
  },
  {
    id: 'endurance',
    label: 'Boost Endurance',
    icon: Timer,
    description: 'Enhance cardiovascular fitness'
  }
];

const GoalsStep: React.FC<GoalsStepProps> = ({ onSelect, selectedGoals }) => {
  const toggleGoal = (goalId: string) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    onSelect(newGoals);
  };

  return (
    <div className="grid gap-4">
      {goals.map(goal => {
        const Icon = goal.icon;
        const isSelected = selectedGoals.includes(goal.id);

        return (
          <motion.button
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleGoal(goal.id)}
            className={`w-full p-6 rounded-lg text-left transition-colors ${
              isSelected
                ? 'bg-[#3dd8e8] text-black'
                : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                isSelected ? 'bg-black/20' : 'bg-black'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{goal.label}</h3>
                <p className={`text-sm ${
                  isSelected ? 'text-black/80' : 'text-gray-400'
                }`}>
                  {goal.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default GoalsStep;