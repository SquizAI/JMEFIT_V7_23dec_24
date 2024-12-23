import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What makes JME FIT different from other fitness programs?',
      answer: 'JME FIT offers personalized training and nutrition plans tailored to your specific goals, with continuous support and adjustments throughout your journey.'
    },
    {
      question: 'How often will I receive updates to my program?',
      answer: 'Programs are reviewed and updated weekly based on your progress and feedback, ensuring optimal results.'
    },
    {
      question: 'Do I need gym access for the programs?',
      answer: 'While some programs are optimized for gym settings, we offer home workout alternatives and can adapt programs based on available equipment.'
    },
    {
      question: 'What kind of support is included?',
      answer: 'You will receive regular check-ins, form feedback, nutrition guidance, and direct messaging access to your coach.'
    },
    {
      question: 'Can I switch programs if needed?',
      answer: 'Yes, we understand that needs change. You can switch programs with guidance from your coach to ensure the transition aligns with your goals.'
    },
    {
      question: 'How long until I see results?',
      answer: 'While results vary by individual, most clients see initial changes within 4-6 weeks when following the program consistently.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Find answers to common questions about our programs and services
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
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

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Still have questions?{' '}
              <motion.a
                href="/contact"
                className="text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact us
              </motion.a>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;