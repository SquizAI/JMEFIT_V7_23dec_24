import React from 'react';
import { Dumbbell, Calendar, Smartphone } from 'lucide-react';
import MainLayout from '../../components/layouts/MainLayout';
import ProgramDetails from '../../components/programs/ProgramDetails';
import ProgramCTA from '../../components/ui/ProgramCTA';

const features = [
  'Access to "JMEFit" App – Full access to Jaime Fit\'s app-based workouts',
  'New Monthly Workouts – Choose from 3, 4, or 5-day workout plans updated each month',
  'Structured Progressions – Programmed progressions to ensure continuous improvement',
  'Video Guidance – Each exercise is paired with instructional videos and setup/execution breakdown',
  'Detailed Prescriptions – Includes prescribed sets, reps, RPE, and rest times',
  'Workout Logging – Record weights, reps, and notes directly within the app',
  'No Long-Term Commitment – Month-to-month membership with flexibility to cancel'
];

const AppWorkouts = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <ProgramDetails
            title="App Workouts"
            price="Starting at $29.99/month"
            description="Access expert-designed workouts with video guidance and progress tracking"
            features={features}
            notes={[
              'You will receive an email to create a login for the app',
              'Due to the digital nature of this program, all sales are final'
            ]}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Smartphone className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">App Access</h3>
                <p className="text-gray-400">Full access to workout library</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Calendar className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Monthly Updates</h3>
                <p className="text-gray-400">New workouts every month</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg">
                <Dumbbell className="w-8 h-8 text-[#3dd8e8] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Video Guides</h3>
                <p className="text-gray-400">Form guidance for every exercise</p>
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

export default AppWorkouts;