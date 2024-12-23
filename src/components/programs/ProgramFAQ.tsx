import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProgramFAQProps {
  faqs: FAQ[];
}

const ProgramFAQ: React.FC<ProgramFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-zinc-900 p-8 rounded-lg mb-12">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black rounded-lg"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left"
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-[#3dd8e8]" />
              ) : (
                <Plus className="w-5 h-5 text-[#3dd8e8]" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-400">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgramFAQ;