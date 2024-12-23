export interface QuestionnaireAnswer {
  goal: string;
  time: string;
  experience: string;
  challenges: string;
  preferences: string;
}

export interface ProgramRecommendation {
  recommendedProgram: 'app-workouts' | 'nutrition' | 'plus';
  explanation: string;
  customizedPlan: {
    workoutFrequency: string;
    focusAreas: string[];
    nutritionTips: string[];
    estimatedTimeframe: string;
  };
  additionalRecommendations: string[];
}