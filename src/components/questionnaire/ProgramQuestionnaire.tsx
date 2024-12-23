import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';
import { OpenAIService } from '../../services/openai';
import { useCart } from '../../contexts/CartContext';
import ProgramConfirmation from './ProgramConfirmation';
import type { QuestionnaireAnswer, ProgramRecommendation } from '../../types/questionnaire';
import QuestionnaireFallback from './QuestionnaireFallback';

const questions = [
  {
    id: 'goals',
    question: 'What are your fitness goals?',
    subtitle: 'Select all that apply',
    options: [
      { value: 'weight-loss', label: 'Weight Loss' },
      { value: 'muscle-gain', label: 'Build Muscle' },
      { value: 'strength', label: 'Get Stronger' },
      { value: 'endurance', label: 'Improve Endurance' },
      { value: 'health', label: 'Better Health' },
      { value: 'flexibility', label: 'Increase Flexibility' }
    ],
    multiple: true
  },
  {
    id: 'days',
    question: 'What\'s your weekly availability?',
    subtitle: 'Select your availability',
    options: [
      { value: '2', label: '2 days' },
      { value: '3', label: '3 days' },
      { value: '4', label: '4 days' },
      { value: '5', label: '5 days' },
      { value: '6', label: '6 days' }
    ],
    multiple: false
  },
  {
    id: 'duration',
    question: 'How long can you train each session?',
    subtitle: 'Select your preferred workout duration',
    options: [
      { value: '30', label: '30 minutes' },
      { value: '45', label: '45 minutes' },
      { value: '60', label: '60 minutes' },
      { value: '90', label: '90 minutes' },
      { value: '120', label: '120+ minutes' }
    ],
    multiple: false
  },
  {
    id: 'experience',
    question: 'What\'s your fitness experience level?',
    options: [
      { value: 'beginner', label: 'Beginner - New to fitness' },
      { value: 'intermediate', label: 'Intermediate - Some experience' },
      { value: 'advanced', label: 'Advanced - Very experienced' }
    ]
  },
  {
    id: 'challenges',
    question: 'What are your main challenges?',
    subtitle: 'Select all that apply',
    options: [
      { value: 'motivation', label: 'Staying Motivated' },
      { value: 'nutrition', label: 'Proper Nutrition' },
      { value: 'time', label: 'Finding Time' },
      { value: 'form', label: 'Exercise Form' },
      { value: 'progress', label: 'Tracking Progress' },
      { value: 'consistency', label: 'Being Consistent' }
    ],
    multiple: true
  },
  {
    id: 'preferences',
    question: 'What type of support do you prefer?',
    subtitle: 'Select all that apply',
    options: [
      { value: 'self-guided', label: 'Self-Guided Programs' },
      { value: 'personal-coaching', label: 'Personal Coaching' },
      { value: 'nutrition-focus', label: 'Nutrition Guidance' },
      { value: 'accountability', label: 'Accountability Check-ins' }
    ],
    multiple: true
  }
];

const ProgramQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswer>({} as QuestionnaireAnswer);
  const [recommendation, setRecommendation] = useState<ProgramRecommendation | null>(null);
  const [thinking, setThinking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const handleAnswer = async (questionId: string, value: string | string[]) => {
    const newAnswers = {
      ...answers,
      [questionId]: value
    };
    setAnswers(newAnswers);
    
    // Only proceed to recommendation after last question
    if (currentQuestion === questions.length - 1 && Object.keys(newAnswers).length >= questions.length) {
      setThinking(true);
      setLoading(true);
      setError(null);
      try {
        const result = await OpenAIService.getRecommendation(newAnswers);
        setRecommendation(result);
        setShowConfirmation(true);
      } catch (err) {
        console.error('Failed to get recommendation:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setThinking(false);
        setLoading(false);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleConfirmProgram = () => {
    if (!recommendation) return;
    
    try {
      setLoading(true);
      // Add recommended program to cart
      const programDetails = getProgramDetails(recommendation.recommendedProgram);
      if (programDetails) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            id: programDetails.id,
            productId: programDetails.id,
            title: programDetails.name,
            price: programDetails.price,
            quantity: 1
          }
        });
      }
      // Navigate to checkout
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgramDetails = (program: string) => {
    const programs = {
      'app-workouts': {
        id: '2dc36526-c95c-4331-889c-2118f222e8a9',
        name: 'App Workouts Only - Self-Led',
        price: 29.99,
        type: 'membership',
        interval: 'monthly'
      },
      'nutrition': {
        id: '81bac6bd-384e-4882-baa1-99a1532ab7c4',
        name: 'Nutrition Only',
        price: 199.99,
        type: 'membership',
        duration: '12 weeks'
      },
      'plus': {
        id: '44b0b0a5-3a5a-4b0e-b643-bf5247956365',
        name: 'Plus Membership',
        price: 349.99,
        type: 'membership',
        duration: '12 weeks'
      }
    };
    return programs[program as keyof typeof programs];
  };

  const handleViewDetails = (program: string) => {
    const programPaths = {
      'app-workouts': '/programs/app-workouts',
      'nutrition': '/programs/nutrition',
      'plus': '/programs/plus'
    };
    navigate(programPaths[program as keyof typeof programPaths]);
  };

  if (showConfirmation && recommendation) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <ProgramConfirmation
            recommendation={recommendation}
            answers={answers}
            onConfirm={handleConfirmProgram}
            onBack={() => setShowConfirmation(false)}
            onViewAlternatives={() => setShowComparison(true)}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    );
  }

  if (thinking) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Brain className="w-16 h-16 text-[#3dd8e8] mx-auto mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">Finding Your Perfect Program</h2>
            <p className="text-gray-400 mb-8">
              JME FIT's virtual concierge is analyzing your responses to create a personalized recommendation based on your:
            </p>
            <div className="bg-zinc-900 p-6 rounded-lg mb-8 text-left">
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-[#3dd8e8] rounded-full"></span>
                  Goals and aspirations
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-[#3dd8e8] rounded-full"></span>
                  Available time commitment
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-[#3dd8e8] rounded-full"></span>
                  Current fitness level
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-[#3dd8e8] rounded-full"></span>
                  Personal challenges
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-[#3dd8e8] rounded-full"></span>
                  Support preferences
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-[#3dd8e8] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return <QuestionnaireFallback />;
  }

  if (recommendation) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Perfect Program Match!</h2>
              <p className="text-gray-400 mb-8">{recommendation.explanation}</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-6">Your Customized Plan</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-[#3dd8e8] mb-2">Recommended Schedule:</h4>
                  <p className="text-gray-300">{recommendation.customizedPlan.workoutFrequency}</p>
                </div>

                <div>
                  <h4 className="font-medium text-[#3dd8e8] mb-2">Focus Areas:</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {recommendation.customizedPlan.focusAreas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-[#3dd8e8] mb-2">Nutrition Tips:</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {recommendation.customizedPlan.nutritionTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-[#3dd8e8] mb-2">Expected Timeline:</h4>
                  <p className="text-gray-300">{recommendation.customizedPlan.estimatedTimeframe}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Your recommended program has been added to cart
              </p>
              <div className="animate-pulse">
                <p className="text-sm text-gray-400">
                  Redirecting to checkout...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedValues = answers[currentQ.id] || (currentQ.multiple ? [] : '');

  const handleOptionSelect = (value: string) => {
    if (currentQ.multiple) {
      const currentValues = (answers[currentQ.id] || []) as string[];
      const newValues = currentValues.includes(value) 
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: newValues
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: value
      }));
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-center gap-2 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestion
                    ? 'bg-[#3dd8e8]'
                    : index < currentQuestion
                    ? 'bg-green-500'
                    : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">{currentQ.question}</h2>
          {currentQ.subtitle && (
            <p className="text-gray-400 text-center mb-8">{currentQ.subtitle}</p>
          )}

          <div className="grid gap-4">
            {currentQ.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full p-6 rounded-lg text-left transition-colors ${
                  currentQ.multiple
                    ? (selectedValues as string[]).includes(option.value)
                      ? 'bg-[#3dd8e8] text-black'
                      : 'bg-zinc-900 hover:bg-zinc-800'
                    : selectedValues === option.value
                    ? 'bg-[#3dd8e8] text-black'
                    : 'bg-zinc-900 hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 border-2 ${
                    currentQ.multiple 
                      ? 'rounded'
                      : 'rounded-full'
                  } ${
                    (currentQ.multiple ? (selectedValues as string[]).includes(option.value) : selectedValues === option.value)
                      ? 'border-black bg-black'
                      : 'border-gray-400'
                  } flex items-center justify-center`}>
                    {(currentQ.multiple ? (selectedValues as string[]).includes(option.value) : selectedValues === option.value) && (
                      <div className={`w-2 h-2 ${currentQ.multiple ? 'rounded' : 'rounded-full'} bg-[#3dd8e8]`} />
                    )}
                  </div>
                  <span className="font-semibold">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {currentQ.multiple && (selectedValues as string[]).length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(currentQ.id, selectedValues)}
              className="w-full mt-6 bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramQuestionnaire;