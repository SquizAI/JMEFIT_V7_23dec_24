import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProfileService } from '../services/profile';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import GoalsStep from '../components/onboarding/GoalsStep';
import ExperienceStep from '../components/onboarding/ExperienceStep';
import AvailabilityStep from '../components/onboarding/AvailabilityStep';

const STEPS = [
  { id: 'goals', title: 'What are your fitness goals?', subtitle: 'Select all that apply' },
  { id: 'experience', title: 'What\'s your fitness experience?', subtitle: 'This helps us personalize your program' },
  { id: 'availability', title: 'When can you train?', subtitle: 'Let us know your schedule' }
];

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async (availability: {
    daysPerWeek: number;
    preferredTimes: string[];
  }) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await ProfileService.completeOnboarding(user.id, {
        fitnessLevel: selectedLevel,
        goals: selectedGoals.map(goal => ({
          type: goal,
          target: null,
          deadline: null
        })),
        availability: {
          daysPerWeek: availability.daysPerWeek,
          preferredTimes: availability.preferredTimes,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={STEPS.length}
      onBack={currentStep > 0 ? handleBack : undefined}
      title={STEPS[currentStep].title}
      subtitle={STEPS[currentStep].subtitle}
    >
      {currentStep === 0 && (
        <GoalsStep
          selectedGoals={selectedGoals}
          onSelect={(goals) => {
            setSelectedGoals(goals);
            if (goals.length > 0) handleNext();
          }}
        />
      )}

      {currentStep === 1 && (
        <ExperienceStep
          selectedLevel={selectedLevel}
          onSelect={(level) => {
            setSelectedLevel(level);
            handleNext();
          }}
        />
      )}

      {currentStep === 2 && (
        <AvailabilityStep
          onSubmit={handleComplete}
        />
      )}
    </OnboardingLayout>
  );
};

export default OnboardingFlow;