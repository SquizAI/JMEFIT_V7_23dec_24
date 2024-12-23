import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Target, Apple, ChevronRight } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';

const MacroGuide = () => {
  const sections = [
    {
      title: 'Understanding Macros',
      content: 'Macronutrients (macros) are the three main nutrients your body needs in large amounts: proteins, carbohydrates, and fats.',
      icon: Calculator
    },
    {
      title: 'Calculating Your Needs',
      content: 'Your macro needs depend on factors like weight, activity level, and goals.',
      icon: Target
    },
    {
      title: 'Food Sources',
      content: 'Learn which foods are rich in each macro and how to balance them in your diet.',
      icon: Apple
    }
  ];

  const macroCalculator = {
    protein: { range: '1.6-2.2g', description: 'per kg of body weight' },
    carbs: { range: '3-7g', description: 'per kg of body weight' },
    fats: { range: '0.5-1.5g', description: 'per kg of body weight' }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">Macro Guide</h1>
          <p className="text-xl text-gray-400 mb-12">
            Master the fundamentals of macro tracking for optimal results
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 p-6 rounded-lg"
                >
                  <Icon className="w-8 h-8 text-[#3dd8e8] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-gray-400">{section.content}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Macro Calculator Guide</h2>
            <div className="space-y-6">
              {Object.entries(macroCalculator).map(([macro, info], index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold capitalize">{macro}</h3>
                    <p className="text-gray-400">{info.description}</p>
                  </div>
                  <div className="text-[#3dd8e8] font-bold">{info.range}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Tracking Tips</h3>
              <ul className="space-y-3">
                {[
                  'Use a food tracking app',
                  'Measure portions accurately',
                  'Plan meals in advance',
                  'Be consistent with tracking',
                  'Adjust based on results'
                ].map((tip, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#3dd8e8]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Common Mistakes</h3>
              <ul className="space-y-3">
                {[
                  'Not tracking consistently',
                  'Ignoring portion sizes',
                  'Forgetting to log snacks',
                  'Not adjusting for activity',
                  'Focusing only on protein'
                ].map((mistake, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[#3dd8e8]" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default MacroGuide;