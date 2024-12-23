import React from 'react';
import { motion } from 'framer-motion';
import { Star, Stars, Zap } from 'lucide-react';

interface ExperienceStepProps {
  onSelect: (level: string) => void;
  selectedLevel: string;
}

const levels = [
  {
    id: 'beginner',
    label: 'Beginner',
    icon: Star,
    description: 'New to fitness or getting back into it'
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    icon: Stars,
    description: 'Regular training with some experience'
  },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: Zap,
    description: 'Experienced with consistent training'
  }
];

const ExperienceStep: React.FC<ExperienceStepProps> = ({ onSelect, selectedLevel }) => {
  return (
    <div className="grid gap-4">
      {levels.map(level => {
        const Icon = level.icon;
        const isSelected = selectedLevel === level.id;

        return (
          <motion.button
            key={level.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(level.id)}
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
                <h3 className="font-semibold">{level.label}</h3>
                <p className={`text-sm ${
                  isSelected ? 'text-black/80' : 'text-gray-400'
                }`}>
                  {level.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ExperienceStep;