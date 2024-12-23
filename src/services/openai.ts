import OpenAI from "openai";
import type { QuestionnaireAnswer, ProgramRecommendation } from '../types/questionnaire';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. AI features will be disabled.');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class OpenAIService {
  static async getRecommendation(answers: QuestionnaireAnswer): Promise<ProgramRecommendation> {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a fitness program advisor for JME FIT. Analyze user responses and recommend the most suitable program. Your response must be a valid JSON object with this exact structure:
{
  "recommendedProgram": "app-workouts" | "nutrition" | "plus",
  "explanation": "string explaining why this program fits",
  "customizedPlan": {
    "workoutFrequency": "string with recommended frequency",
    "focusAreas": ["array", "of", "focus", "areas"],
    "nutritionTips": ["array", "of", "nutrition", "tips"],
    "estimatedTimeframe": "string with timeframe"
  },
  "additionalRecommendations": ["array", "of", "additional", "tips"]
}

Available programs:
1. App Workouts Only ($29.99/month)
   - Self-motivated users
   - Independent workouts
   - Workout guidance and tracking
   - Monthly commitment

2. Nutrition Only ($199.99/12 weeks)
   - Diet transformation focus
   - Meal planning and macros
   - Personalized nutrition guidance
   - Current workout routine comfortable

3. Plus Membership ($349.99/12 weeks)
   - Comprehensive transformation
   - Workout and nutrition guidance
   - Hands-on coaching
   - Accountability and support

Ensure your response is a properly formatted JSON object that matches the schema exactly.`
          },
          {
            role: "user",
            content: `Based on these answers, recommend the best program:
Goal: ${answers.goal}
Available Time: ${answers.time}
Experience Level: ${answers.experience}
Main Challenges: ${answers.challenges}
Preferences: ${answers.preferences}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const recommendation = JSON.parse(completion.choices[0].message.content);
      return recommendation;
    } catch (err) {
      console.error('OpenAI service error:', err);
      throw new Error('Failed to generate recommendation');
    }
  }
}