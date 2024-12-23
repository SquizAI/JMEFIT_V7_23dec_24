import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, MessageCircle, Calendar, RefreshCcw, ShoppingCart, CheckCircle, Star } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import { useCart } from '../../contexts/CartContext';
import { useMemberships } from '../../hooks/useMemberships';
import LoadingState from '../../components/common/LoadingState';
import MembershipComparison from '../../components/shop/MembershipComparison'; 
import type { Membership } from '../../types/memberships';
import type { MembershipInterval } from '../../types/products';
import { parseMembershipFeatures } from '../../utils/membership';

import { getMembershipIcon } from '../../utils/membership';
import { useNavigate } from 'react-router-dom';

const Memberships = () => {
  const { dispatch } = useCart();
  const [selectedInterval, setSelectedInterval] = useState<MembershipInterval>('monthly');
  const { memberships, loading, error } = useMemberships();
  const navigate = useNavigate();

  const handleSubscribe = (membership: Membership) => {
    const price = selectedInterval === 'monthly' ? membership.price_monthly : membership.price_yearly;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: membership.id,
        productId: membership.id,
        title: membership.name,
        price: price,
        quantity: 1
      }
    });
    navigate('/checkout');
  };
  
  const membershipContent = {
    title: 'Monthly Memberships (Recurring Services)',
    sections: [
      {
        title: 'App Workouts Only',
        plans: [
          {
            name: 'Self-Led (Month-to-Month)',
            features: [
              'Access to "JMEFit" App – Full access to Jaime Fit\'s app-based workouts.',
              'New Monthly Workouts – Choose from 3, 4, or 5-day workout plans updated each month.',
              'Structured Progressions – Programmed progressions to ensure continuous improvement.',
              'Video Guidance – Each exercise is paired with instructional videos and setup/execution breakdown for correct form.',
              'Detailed Prescriptions – Includes prescribed sets, reps, RPE (Rate of Perceived EXERTION), and rest times for each exercise.',
              'Workout Logging – Ability to record weights, reps, and notes each week directly within the app.',
              'No Long-Term Commitment – Month-to-month membership with the flexibility to cancel anytime.'
            ]
          },
          {
            name: 'Trainer Feedback (Month-to-Month)',
            features: [
              'Includes Everything from Self-Led – Access to all features of the Self-Led membership.',
              'Form Checks – Submit workout videos for personalized feedback to ensure correct form and prevent injury.',
              'Direct Access to Jaime – Privately message Jaime anytime through the app for adjustments and advice.',
              'Adaptable Workouts – Swap exercises or add traveling programs based on your schedule or location, as well as rehabilitative plans as needed.',
              'Full Workout Access – Access to all previous workouts for as long as the membership is active.'
            ]
          }
        ]
      },
      {
        title: 'Nutrition Only (12-Week Program)',
        features: [
          'One-on-One Coaching – Work directly with Jaime throughout the 12 weeks.',
          'Anytime Messaging – Communicate with Jaime through the app for ongoing support.',
          'Custom Meal Plans – Tailored to individual goals, preferences, and any health restrictions. Detailed macro breakdown provided for each meal and snack.',
          'Macro Coaching Guidebook – A comprehensive guide explaining macronutrients, macro tracking, alcohol tracking, meal prep tips, best practices, and more.',
          'Weekly Check-Ins – Receive weekly feedback and plan adjustments based on progress.',
          'Grocery List – A detailed grocery list aligned with your custom meal plan and macro goals.',
          'Adaptive Adjustments – Macros and meals are adjusted throughout the program based on feedback and results.'
        ],
        whoIsItFor: 'I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn\'t real life and you never learn how to eat at any place at anytime, however this will give you a starting point and lots of ideas! I do macro/nutrition personalization and ongoing coaching/macro manipulation when it\'s time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life. Everything is customized according to your TDEE, height, weight and BF%, and activity level. The goal (once desired body fat % is achieved) is to roll into a reverse diet and add calories (macros) back in slowly with very little weight gain. At this point, maintenance or recomp phases are the typical next step before entering another deficit.',
        notes: [
          'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros. There will also be a video of the walkthrough of navigating the workout portion of the app in the CHAT.',
          'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase.'
        ]
      },
      {
        title: 'Plus Membership (12-Week Program)',
        features: [
          'Comprehensive Offering – Combines everything from Trainer Feedback and Nutrition Only One-on-One programs.',
          'Custom Workout Plans – Tailored workouts designed specifically for your fitness goals.',
          'Custom Meal Plan – A fully personalized meal plan supporting your lifestyle and workout regimen.',
          'Weekly Check-Ins – Consistent progress checks, biofeedback assessment, and plan adjustments from Jaime.',
          'Macro Coaching Guidebook – Same detailed guide as provided in Nutrition Only.',
          'Grocery List – Comprehensive list covering all meal plan items.',
          'Anytime Access – Message Jaime anytime for questions, help or adjustments.',
          'Form and Progress Reviews – Continuous feedback on exercise form and nutritional progress.'
        ],
        whoIsItFor: `I start you with meal plans and snacks custom to your macros, but aim to teach you how to build your own. Meal plans only last so long and fail bc it isn't real life and you never learn how to eat at any place, anytime 🤗, however this will give you a starting point and lots of ideas! I do macro/nutrition personalization and ongoing coaching/macro manipulation when it's time for an adjustment. I help you build what you like to eat so that you experience fat loss/muscle gain while living a non-restrictive life. Everything is customized according to your TDEE, height, weight and BF%, activity level- then you get a guidebook from me with tons of info and a guideline for weekly check ins and feedback as well as a grocery list and sample meals. You eat the foods you like as long as it fits in your macros, which means you can stay on track anywhere and all the time, but still creates a healthy balance as fat only accounts for about 25%. The goal (once desired body fat % is achieved) is to roll into a reverse diet and add calories (macros) back in slowly with very little weight gain. At this point, maintenance or recomp phases are the typical next step before entering another deficit.

The workout part includes me sending videos of each movement (in a library) for you to know form and the exact sets/reps and perceived exertion in which I want you working. You track your weights used and reps completed so you can see that history the following week. You get new splits every 4 weeks so you can practice progressive overload and allow your body to get stronger before just changing the workout for that muscle group. You can also send me videos of yourself doing anything you have a question about or want me to send feedback for at check in through the app. They can be 3, 4, or 5 day splits, weights, body weight, bands, whatever you have access to. This is all based on what you can realistically do with your schedule and I build that activity into your nutrition.`,
        notes: [
          'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros. There will also be a video of the walkthrough of navigating the workout portion of the app in the CHAT.',
          'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase.'
        ]
      }
    ]
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <div className="animate-pulse bg-zinc-800 h-8 w-64 mx-auto rounded mb-4"></div>
            <div className="animate-pulse bg-zinc-800 h-4 w-96 mx-auto rounded"></div>
          </div>
          <LoadingState type="card" count={3} />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 min-h-screen">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-500/10 text-red-500 p-6 rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Error Loading Memberships</h2>
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd8e8] text-black rounded-lg hover:bg-[#34c5d3] transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!memberships?.length) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 min-h-screen">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-yellow-500/10 text-yellow-500 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">No Memberships Available</h2>
              <p>Please check back later for available membership plans.</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{membershipContent.title}</h1>
            <p className="text-gray-400 mb-8">Choose the perfect plan for your fitness journey</p>
            
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedInterval('monthly')}
                className={`px-6 py-2 rounded-full ${
                  selectedInterval === 'monthly'
                    ? 'bg-[#3dd8e8] text-black'
                    : 'bg-zinc-900 text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedInterval('yearly')}
                className={`px-6 py-2 rounded-full ${
                  selectedInterval === 'yearly'
                    ? 'bg-[#3dd8e8] text-black'
                    : 'bg-zinc-900 text-gray-400'
                }`}
              >
                Yearly
                <span className="ml-2 text-sm text-[#3dd8e8]">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {memberships.map((membership, index) => {
              const Icon = getMembershipIcon(index);
              const features = parseMembershipFeatures(membership.features);
              const price = selectedInterval === 'monthly' ? 
                membership.price_monthly : 
                membership.price_yearly;

              return (
                <motion.div
                  key={membership.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-zinc-900 rounded-lg p-8 ${
                    membership.popular ? 'ring-2 ring-[#3dd8e8]' : ''
                  }`}
                >
                  {membership.popular && (
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#3dd8e8] text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#3dd8e8]/10 rounded-lg">
                      <Icon className="w-8 h-8 text-[#3dd8e8]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{membership.name}</h3>
                      <p className="text-gray-400">{membership.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-[#3dd8e8]">
                      ${price.toFixed(2)}
                      <span className="text-lg text-gray-400 ml-2">
                        /{selectedInterval === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#3dd8e8]" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubscribe(membership)}
                    className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Get Started
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-8">Compare Plans</h2>
            <MembershipComparison
              memberships={memberships}
              selectedInterval={selectedInterval}
            />
          </div>

          <div className="mt-12 bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Can I switch plans later?</h3>
                <p className="text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a commitment?</h3>
                <p className="text-gray-400">
                  No long-term commitment required. You can cancel your membership at any time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Memberships;