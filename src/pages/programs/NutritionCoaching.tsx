import React from 'react';
import { Salad, MessageCircle, Book } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import ProgramDetails from '../../components/programs/ProgramDetails';
import ProgramCTA from '../../components/ui/ProgramCTA';

const features = [
  'One-on-One Coaching – Work directly with Jaime throughout the 12 weeks',
  'Anytime Messaging – Communicate with Jaime through the app for ongoing support',
  'Custom Meal Plans – Tailored to individual goals, preferences, and health restrictions',
  'Macro Coaching Guidebook – Comprehensive guide explaining macronutrients and tracking',
  'Weekly Check-Ins – Receive weekly feedback and plan adjustments based on progress',
  'Grocery List – Detailed grocery list aligned with your custom meal plan',
  'Adaptive Adjustments – Macros and meals adjusted based on feedback and results'
];

const whoIsItFor = `I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn't real life and you never learn how to eat at any place at anytime, however this will give you a starting point and lots of ideas!

I do macro/nutrition personalization and ongoing coaching/macro manipulation when it's time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life.

Everything is customized according to your TDEE, height, weight and BF%, and activity level. The goal (once desired body fat % is achieved) is to roll into a reverse diet and add calories (macros) back in slowly with very little weight gain. At this point, maintenance or recomp phases are the typical next step before entering another deficit.`;

const notes = [
  'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros',
  'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase'
];

const NutritionCoaching = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <ProgramDetails
            title="Nutrition Coaching"
            price="$199.99 for 12 weeks"
            description="Transform your relationship with food through personalized nutrition coaching"
            features={features}
            whoIsItFor={whoIsItFor}
            notes={notes}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Salad className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Plans</h3>
                <p className="text-gray-400">Personalized meal plans and macros</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <MessageCircle className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Direct Support</h3>
                <p className="text-gray-400">Ongoing guidance from Jaime</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Book className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Macro Guide</h3>
                <p className="text-gray-400">Comprehensive nutrition education</p>
              </div>
            </div>

            <div className="text-center">
              <ProgramCTA text="Start Your Journey" path="/shop/memberships" />
            </div>
          </ProgramDetails>
        </div>
      </div>
    </MainLayout>
  );
};

export default NutritionCoaching;