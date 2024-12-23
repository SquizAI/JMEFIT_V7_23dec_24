import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import type { Membership } from '../../types/memberships';
import { parseMembershipFeatures, formatPrice } from '../../utils/membership';

interface MembershipCardProps {
  membership: Membership;
  interval: 'monthly' | 'yearly';
  icon: React.ElementType;
  onSubscribe: (membership: Membership) => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  membership,
  interval,
  icon: Icon,
  onSubscribe
}) => {
  const features = Array.isArray(membership.features) ? membership.features : [];
  const price = interval === 'monthly' ? membership.price_monthly : membership.price_yearly;

  const renderDetails = () => {
    if (!membership.details) return null;
    
    return (
      <div className="mb-6 text-sm">
        {membership.details.whoIsItFor && (
          <div className="mb-4">
            <h4 className="font-semibold text-[#3dd8e8] mb-2">Who is this for?</h4>
            <p className="text-gray-400">{membership.details.whoIsItFor}</p>
          </div>
        )}
        {membership.details.notes && membership.details.notes.length > 0 && (
          <div>
            <h4 className="font-semibold text-[#3dd8e8] mb-2">Important Notes</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              {membership.details.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const handleSubscribe = () => onSubscribe(membership);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
          <div className="text-gray-400">
            <p>{membership.description}</p>
            {(membership.duration || membership.level) && (
              <p className="mt-1 text-sm">
                {membership.duration && <span>{membership.duration}</span>}
                {membership.duration && membership.level && <span> • </span>}
                {membership.level && <span>{membership.level}</span>}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-[#3dd8e8]">
          {formatPrice(price, interval)}
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

      {renderDetails()}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSubscribe(membership)}
        className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default MembershipCard;