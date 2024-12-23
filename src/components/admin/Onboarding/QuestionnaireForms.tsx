import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { db } from '../../../db';

const QuestionnaireForms = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestionnaires = async () => {
      try {
        const results = await db.all('SELECT * FROM questionnaires ORDER BY created_at DESC');
        setQuestionnaires(results);
      } catch (error) {
        console.error('Error loading questionnaires:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaires();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Questionnaire Forms</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Create Form
        </motion.button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3dd8e8] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading questionnaires...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questionnaires.map((questionnaire) => (
            <motion.div
              key={questionnaire.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{questionnaire.title}</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400 mt-2">
                    {questionnaire.type.charAt(0).toUpperCase() + questionnaire.type.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-zinc-800 rounded-lg">
                    <Edit className="w-5 h-5 text-[#3dd8e8]" />
                  </button>
                  <button className="p-2 hover:bg-zinc-800 rounded-lg">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {JSON.parse(questionnaire.questions).map((question, index) => (
                  <div key={index} className="bg-black p-4 rounded-lg">
                    <p className="font-medium mb-2">{question.text}</p>
                    {question.type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                            <span className="text-gray-400">{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.type === 'text' && (
                      <div className="bg-zinc-800 p-2 rounded border border-zinc-700">
                        <span className="text-gray-400">Text input field</span>
                      </div>
                    )}
                   Continuing the QuestionnaireForms.tsx file content exactly where it left off:

                    )}
                    {question.type === 'number' && (
                      <div className="bg-zinc-800 p-2 rounded border border-zinc-700">
                        <span className="text-gray-400">Numeric input field</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireForms;