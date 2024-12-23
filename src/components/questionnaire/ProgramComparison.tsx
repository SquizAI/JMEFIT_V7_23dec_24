import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import type { ProgramRecommendation } from '../../types/questionnaire';

interface ProgramComparisonProps {
  recommendation: ProgramRecommendation;
  onSelect: (program: string) => void;
  onBack: () => void;
}

const ProgramComparison: React.FC<ProgramComparisonProps> = ({
  recommendation,
  onSelect,
  onBack
}) => {
  const programs = [
    {
      id: 'app-workouts',
      name: 'App Workouts',
      price: '$29.99/month',
      features: [
        'Access to all app workouts',
        'Monthly workout updates',
        'Progress tracking',
        'Exercise video guides',
        'Self-guided experience'
      ],
      recommended: recommendation.recommendedProgram === 'app-workouts'
    },
    {
      id: 'nutrition',
      name: 'Nutrition Only',
      price: '$199.99',
      features: [
        'Custom meal plans',
        'Macro calculations',
        'Weekly check-ins',
        'Nutrition guidance',
        'Recipe suggestions'
      ],
      recommended: recommendation.recommendedProgram === 'nutrition'
    },
    {
      id: 'plus',
      name: 'Plus Membership',
      price: '$349.99',
      features: [
        'Custom workouts',
        'Nutrition planning',
        'Direct coach access',
        'Form checks',
        'Weekly check-ins'
      ],
      recommended: recommendation.recommendedProgram === 'plus'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Compare Programs</h2>
        <p className="text-gray-400">Choose the program that best fits your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-zinc-900 p-6 rounded-lg ${
              program.recommended ? 'ring-2 ring-[#3dd8e8]' : ''
            }`}
          >
            {program.recommended && (
              <div className="bg-[#3dd8e8] text-black px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                Recommended
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{program.name}</h3>
            <p className="text-2xl font-bold text-[#3dd8e8] mb-4">{program.price}</p>
            <ul className="space-y-3 mb-6">
              {program.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#3dd8e8]" />
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(program.id)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                program.recommended
                  ? 'bg-[#3dd8e8] text-black hover:bg-[#34c5d3]'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              Select Program
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="bg-zinc-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
        >
          Back to Recommendation
        </motion.button>
      </div>
    </div>
  );
};

export default ProgramComparison;