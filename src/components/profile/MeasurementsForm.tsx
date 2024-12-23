import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Plus } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import type { UserMeasurements } from '../../types/profile';

const MeasurementsForm = () => {
  const { profile, addMeasurement } = useProfile();
  const [newMeasurement, setNewMeasurement] = useState<Partial<UserMeasurements>>({
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addMeasurement(newMeasurement);
      setNewMeasurement({
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Failed to add measurement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date
            </label>
            <input
              type="date"
              value={newMeasurement.date}
              onChange={(e) => setNewMeasurement({ ...newMeasurement, date: e.target.value })}
              className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Weight (lbs)
            </label>
            <input
              type="number"
              step="0.1"
              value={newMeasurement.weight || ''}
              onChange={(e) => setNewMeasurement({ ...newMeasurement, weight: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Body Fat %
            </label>
            <input
              type="number"
              step="0.1"
              value={newMeasurement.bodyFat || ''}
              onChange={(e) => setNewMeasurement({ ...newMeasurement, bodyFat: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Measurements (inches)</h3>
          <div className="grid grid-cols-2 gap-4">
            {['chest', 'waist', 'hips', 'arms', 'thighs'].map((measurement) => (
              <div key={measurement}>
                <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                  {measurement}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newMeasurement[measurement as keyof typeof newMeasurement] || ''}
                  onChange={(e) => setNewMeasurement({
                    ...newMeasurement,
                    [measurement]: parseFloat(e.target.value)
                  })}
                  className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Notes
          </label>
          <textarea
            value={newMeasurement.notes || ''}
            onChange={(e) => setNewMeasurement({ ...newMeasurement, notes: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] h-32 resize-none"
            placeholder="Add any notes about your measurements..."
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
              Add Measurement
            </>
          )}
        </motion.button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">History</h3>
        {profile.measurements?.map((measurement, index) => (
          <div key={index} className="bg-black p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#3dd8e8]" />
                <span className="font-medium">
                  {new Date(measurement.date).toLocaleDateString()}
                </span>
              </div>
              {measurement.weight && (
                <span className="text-[#3dd8e8]">{measurement.weight} lbs</span>
              )}
            </div>
            {measurement.bodyFat && (
              <p className="text-sm text-gray-400">
                Body Fat: {measurement.bodyFat}%
              </p>
            )}
            {measurement.notes && (
              <p className="text-sm text-gray-400 mt-2">{measurement.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeasurementsForm;