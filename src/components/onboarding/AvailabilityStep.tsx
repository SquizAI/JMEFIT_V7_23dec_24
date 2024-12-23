import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

interface AvailabilityStepProps {
  onSubmit: (availability: {
    daysPerWeek: number;
    preferredTimes: string[];
  }) => void;
}

const AvailabilityStep: React.FC<AvailabilityStepProps> = ({ onSubmit }) => {
  const [daysPerWeek, setDaysPerWeek] = React.useState(3);
  const [preferredTimes, setPreferredTimes] = React.useState<string[]>([]);

  const timeSlots = [
    'Early Morning (5-8am)',
    'Morning (8-11am)',
    'Midday (11am-2pm)',
    'Afternoon (2-5pm)',
    'Evening (5-8pm)',
    'Night (8-11pm)'
  ];

  const toggleTimeSlot = (time: string) => {
    setPreferredTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-lg font-semibold mb-4">
          Days per week
        </label>
        <div className="grid grid-cols-4 gap-4">
          {[2, 3, 4, 5].map(days => (
            <motion.button
              key={days}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDaysPerWeek(days)}
              className={`p-4 rounded-lg text-center transition-colors ${
                daysPerWeek === days
                  ? 'bg-[#3dd8e8] text-black'
                  : 'bg-zinc-900 hover:bg-zinc-800'
              }`}
            >
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              {days} days
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-4">
          Preferred workout times
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          {timeSlots.map(time => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleTimeSlot(time)}
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                preferredTimes.includes(time)
                  ? 'bg-[#3dd8e8] text-black'
                  : 'bg-zinc-900 hover:bg-zinc-800'
              }`}
            >
              <Clock className="w-5 h-5" />
              {time}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSubmit({ daysPerWeek, preferredTimes })}
        disabled={preferredTimes.length === 0}
        className="w-full mt-8 bg-[#3dd8e8] text-black py-4 rounded-lg font-semibold disabled:opacity-50"
      >
        Complete Setup
      </motion.button>
    </div>
  );
};

export default AvailabilityStep;