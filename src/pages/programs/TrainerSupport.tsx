import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Video, CheckCircle, Users } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import ProgramFAQ from '../../components/programs/ProgramFAQ';
import ProgramCTA from '../../components/ui/ProgramCTA';

const faqs = [
  {
    question: "How does trainer support work?",
    answer: "You'll have direct access to message Jaime through the app for form checks, program adjustments, and general guidance. Response time is typically within 24 hours."
  },
  {
    question: "How often can I submit form checks?",
    answer: "You can submit form check videos as often as needed. We recommend submitting videos for new exercises or when increasing weight significantly."
  },
  {
    question: "Can workouts be modified?",
    answer: "Yes! Jaime will help modify workouts based on your equipment access, schedule, or when traveling."
  },
  {
    question: "What's included beyond the app workouts?",
    answer: "You get everything in the App Workouts plan plus direct trainer support, form checks, custom modifications, and priority support."
  }
];

const TrainerSupport = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6">Trainer Support</h1>
          <p className="text-xl text-gray-400 mb-8">
            Get personalized guidance and support directly from Jaime
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <MessageCircle className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Direct Access</h3>
              <p className="text-gray-400">Message Jaime anytime</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <Video className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Form Checks</h3>
              <p className="text-gray-400">Video feedback on form</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg">
              <Users className="w-8 h-8 text-[#3dd8e8] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Support</h3>
              <p className="text-gray-400">Personalized modifications</p>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <ul className="space-y-4">
              {[
                'Everything in App Workouts',
                'Direct messaging with Jaime',
                'Form check video reviews',
                'Custom workout modifications',
                'Travel workout options',
                'Priority support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3dd8e8]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <ProgramFAQ faqs={faqs} />

          <div className="text-center">
            <ProgramCTA text="Get Started" path="/shop/memberships" />
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default TrainerSupport;