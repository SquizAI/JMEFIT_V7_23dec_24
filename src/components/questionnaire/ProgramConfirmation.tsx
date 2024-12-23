import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { ProgramRecommendation, QuestionnaireAnswer } from '../../types/questionnaire';

interface ProgramConfirmationProps {
  recommendation: ProgramRecommendation;
  answers: QuestionnaireAnswer;
  onConfirm: () => void;
  onBack: () => void;
  onViewAlternatives: () => void;
  onViewDetails: (program: string) => void;
}

const ProgramConfirmation: React.FC<ProgramConfirmationProps> = ({
  recommendation,
  answers,
  onConfirm,
  onBack,
  onViewAlternatives,
  onViewDetails
}) => {
  const programDetails = {
    'app-workouts': {
      name: 'App Workouts',
      price: '$29.99/month',
      idealFor: [
        'Self-motivated individuals',
        'Those who prefer flexible scheduling',
        'People who want guided workouts',
        'Budget-conscious fitness enthusiasts'
      ]
    },
    'nutrition': {
      name: 'Nutrition Only',
      price: '$199.99',
      idealFor: [
        'Those focused on diet transformation',
        'People wanting personalized meal plans',
        'Those needing nutritional guidance',
        'Individuals with specific dietary goals'
      ]
    },
    'plus': {
      name: 'Plus Membership',
      price: '$349.99',
      idealFor: [
        'Those wanting comprehensive support',
        'People seeking maximum results',
        'Those needing both workout and nutrition guidance',
        'Individuals wanting personalized coaching'
      ]
    }
  };

  const selectedProgram = programDetails[recommendation.recommendedProgram];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-[#3dd8e8]/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-[#3dd8e8]" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Your Perfect Program Match!</h2>
        <p className="text-gray-400">Based on your responses, we recommend:</p>
      </div>

      <div className="bg-zinc-900 p-6 rounded-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold text-[#3dd8e8] mb-3">{selectedProgram.name}</h3>
            <p className="text-4xl font-bold">{selectedProgram.price}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewDetails(recommendation.recommendedProgram)}
          className="w-full mb-6 bg-[#3dd8e8]/20 text-[#3dd8e8] py-4 rounded-lg font-semibold hover:bg-[#3dd8e8]/30 transition-colors flex items-center justify-center gap-2 text-lg"
        >
          View Full Program Details
          <ArrowRight className="w-6 h-6" />
        </motion.button>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-[#3dd8e8] mb-2">Why This Program?</h4>
            <p className="text-gray-300">{recommendation.explanation}</p>
          </div>

          <div>
            <h4 className="font-medium text-[#3dd8e8] mb-2">Your Goals</h4>
            <div className="grid gap-2">
              {answers.goals?.map((goal, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[#3dd8e8] mb-2">Program Features</h4>
            <div className="grid gap-2">
              {selectedProgram.idealFor.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-[#3dd8e8]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-[#3dd8e8] mb-2">Customized Plan</h4>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-medium">Recommended Schedule:</span>{' '}
                {recommendation.customizedPlan.workoutFrequency}
              </p>
              <div>
                <span className="font-medium">Focus Areas:</span>
                <ul className="mt-2 space-y-1">
                  {recommendation.customizedPlan.focusAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#3dd8e8] rounded-full"></span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-medium">Expected Timeline:</span>{' '}
                {recommendation.customizedPlan.estimatedTimeframe}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewAlternatives}
          className="flex-1 bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
        >
          View All Programs
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors border border-[#3dd8e8]"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="flex-1 bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
        >
          Continue to Checkout
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ProgramConfirmation;