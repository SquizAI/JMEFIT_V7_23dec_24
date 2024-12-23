import React from 'react';
import { Trophy, Target, Calendar } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import ProgramDetails from '../../components/programs/ProgramDetails';
import ProgramCTA from '../../components/ui/ProgramCTA';

const features = [
  'Short-Term Intensive – 6-week signature fat-loss program proven to give results',
  'Personalized Macros - Custom macro setting for fat loss and muscle preservation',
  'Full Workouts – Both Home and Gym options, plus pre & post workout stretches',
  'Sample Meal Plans – Full-day eating plans with macro breakdown and grocery list',
  'Macro Guidebook – Comprehensive guide to macronutrients and nutrition tips',
  'Fast-Track Approach – Designed to provide a rapid jumpstart to fitness',
  'Progress Tracking – Record weights, reps, rest time, notes & more in the app'
];

const whoIsItFor = `You want to make real progress towards your health and fitness goals, without sacrificing your favorite foods and social life.
- You're tired of yo-yo dieting and cookie-cutter plans that don't work.
- You want to learn real methods that will give you lasting results.
- You want to learn more about weight training and nutrition.
- You desire accountability and structure.
- You want to build a solid foundation around fitness and nutrition.`;

const notForYouIf = [
  'You are currently struggling with an eating disorder or another serious mental or physical health condition',
  'You are looking for a custom meal plan (see Monthly Memberships for custom plans)',
  'You aren\'t open to learning or growing',
  'You want to continue to struggle when it comes to your health and fitness'
];

const equipment = [
  'Dumbbells',
  'Resistance bands',
  'Bench (helpful but not required)'
];

const notes = [
  'This is not a meal plan & does not include coaching. There are no check-ins. Prior knowledge of macros is helpful, but not required',
  'Upon purchase, you will receive an email to create a login for the app',
  'You will receive an email with the Macro Guidebook and a questionnaire to complete for your custom macros',
  'Due to the digital nature of this program, all sales are final. Please ask all questions prior to purchase'
];

const ShredProgram = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <ProgramDetails
            title="SHRED Program"
            price="$199.99"
            description="6-week intensive transformation program for rapid results"
            features={features}
            whoIsItFor={whoIsItFor}
            notForYouIf={notForYouIf}
            equipment={equipment}
            notes={notes}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Trophy className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-gray-400">Signature fat-loss program</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Target className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Clear Goals</h3>
                <p className="text-gray-400">Structured progression</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Calendar className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">6-Week Program</h3>
                <p className="text-gray-400">Fast-track transformation</p>
              </div>
            </div>

            <div className="text-center">
              <ProgramCTA 
                text="Start Your Transformation" 
                path="/shop/memberships"
                programId="shred-program"
              />
            </div>
          </ProgramDetails>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShredProgram;