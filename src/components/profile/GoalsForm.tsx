import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Calendar } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import type { UserGoal } from '../../types/profile';

const goalTypes = [
  { id: 'weight-loss', label: 'Weight Loss' },
  { id: 'muscle-gain', label: 'Muscle Gain' },
  { id: 'strength', label: 'Strength' },
  { id: 'endurance', label: 'Endurance' }
] as const;

const GoalsForm = () => {
  const { profile, updateProfile } = useProfile();
  const [newGoal, setNewGoal] = useState<Partial<UserGoal>>({
    type: 'weight-loss'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.type) return;

    setLoading(true);
    try {
      const updatedGoals = [...(profile.goals || []), newGoal as UserGoal];
      await updateProfile({ goals: updatedGoals });
      setNewGoal({ type: 'weight-loss' });
    } catch (error) {
      console.error('Failed to add goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGoal = async (index: number) => {
    try {
      const updatedGoals = profile.goals.filter((_, i) => i !== index);
      await updateProfile({ goals: updatedGoals });
    } catch (error) {
      console.error('Failed to remove goal:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Goal Type
          </label>
          <select
            value={newGoal.type}
            onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value as UserGoal['type'] })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          >
            {goalTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Target
          </label>
          <input
            type="text"
            value={newGoal.target || ''}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            placeholder="e.g., Lose 10 lbs, Run 5k"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Target Date
          </label>
          <input
            type="date"
            value={newGoal.deadline || ''}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Goal
            </>
          )}
        </motion.button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Goals</h3>
        {profile.goals?.map((goal, index) => (
          <div key={index} className="bg-black p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3dd8e8]" />
                <span className="font-medium capitalize">
                  {goal.type.replace('-', ' ')}
                </span>
              </div>
              <button
                onClick={() => handleRemoveGoal(index)}
                className="text-red-500 hover:text-red-400"
              >
                Remove
              </button>
            </div>
            {goal.target && (
              <p className="text-gray-400">{goal.target}</p>
            )}
            {goal.deadline && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <Calendar className="w-4 h-4" />
                Target: {new Date(goal.deadline).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
        {(!profile.goals || profile.goals.length === 0) && (
          <p className="text-center text-gray-400 py-4">
            No goals set yet
          </p>
        )}
      </div>
    </div>
  );
};

export default GoalsForm;