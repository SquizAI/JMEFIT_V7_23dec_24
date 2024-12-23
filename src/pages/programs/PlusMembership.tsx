import React from 'react';
import { Star, MessageCircle, Dumbbell } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import ProgramDetails from '../../components/programs/ProgramDetails';
import ProgramCTA from '../../components/ui/ProgramCTA';

const features = [
  'Comprehensive Offering – Combines everything from Trainer Feedback and Nutrition Only programs',
  'Custom Workout Plans – Tailored workouts designed specifically for your fitness goals',
  'Custom Meal Plan – A fully personalized meal plan supporting your lifestyle',
  'Weekly Check-Ins – Progress checks, biofeedback assessment, and plan adjustments',
  'Macro Coaching Guidebook – Detailed guide for nutrition understanding',
  'Grocery List – Comprehensive list for meal plan items',
  'Anytime Access – Message Jaime anytime for support',
  'Form Reviews – Continuous feedback on exercise technique'
];

const whoIsItFor = `I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn't real life and you never learn how to eat at any place, anytime 🤗, however this will give you a starting point and lots of ideas!

I do macro/nutrition personalization and ongoing coaching/macro manipulation when it's time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life. Everything is customized according to your TDEE, height, weight and BF%, activity level- then you get a guidebook from me with tons of info and a guideline for weekly check ins and feedback as well as a grocery list and sample meals.

The workout part includes me sending videos of each movement (in a library) for you to know form and the exact sets/reps and perceived exertion in which I want you working. You track your weights used and reps completed so you can see that history the following week. You get new splits every 4 weeks so you can practice progressive overload and allow your body to get stronger before just changing the workout for that muscle group.

You can also send me videos of yourself doing anything you have a question about or want me to send feedback for at check in through the app. They can be 3, 4, or 5 day splits, weights, body weight, bands, whatever you have access to. This is all based on what you can realistically do with your schedule and I build that activity into your nutrition.`;

const notes = [
  'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros',
  'There will also be a video walkthrough of navigating the workout portion of the app in the CHAT',
  'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase'
];

const PlusMembership = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <ProgramDetails
            title="Plus Membership"
            price="$349.99 for 12 weeks"
            description="The ultimate transformation package combining personalized workouts and nutrition"
            features={features}
            whoIsItFor={whoIsItFor}
            notes={notes}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Star className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Complete Package</h3>
                <p className="text-gray-400">Everything you need for success</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Dumbbell className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Workouts</h3>
                <p className="text-gray-400">Personalized training plans</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <MessageCircle className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Direct Support</h3>
                <p className="text-gray-400">Unlimited access to Jaime</p>
              </div>
            </div>

            <div className="text-center">
              <ProgramCTA text="Transform Your Life" path="/shop/memberships" />
            </div>
          </ProgramDetails>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlusMembership;