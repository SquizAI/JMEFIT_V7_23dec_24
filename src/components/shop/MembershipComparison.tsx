import React from 'react';
import { Check, X } from 'lucide-react';
import type { Membership } from '../../types/memberships';

type MembershipInterval = 'monthly' | 'yearly';

interface MembershipComparisonProps {
  memberships: Membership[];
  selectedInterval: MembershipInterval;
}

const MembershipComparison: React.FC<MembershipComparisonProps> = ({
  memberships,
  selectedInterval
}) => {
  // All possible features across all plans
  const allFeatures = Array.from(new Set(
    memberships.flatMap(m => 
      Array.isArray(m.features) ? m.features : []
    )
  ));

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-4 bg-zinc-900">Features</th>
            {memberships.map((membership) => (
              <th key={membership.id} className="p-4 bg-zinc-900 text-center">
                <div className="font-semibold text-lg mb-2">{membership.name}</div>
                <div className="text-2xl font-bold text-[#3dd8e8]">
                  ${(selectedInterval === 'monthly' ? 
                    membership.price_monthly : 
                    membership.price_yearly).toFixed(2)}
                  <span className="text-sm text-gray-400">
                    /{selectedInterval === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <tr key={index} className="border-t border-zinc-800">
              <td className="p-4">{feature}</td>
              {memberships.map((membership) => {
                const membershipFeatures = Array.isArray(membership.features) ? 
                  membership.features : [];
                const hasFeature = membershipFeatures.includes(feature);
                
                return (
                  <td key={membership.id} className="p-4 text-center">
                    {hasFeature ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembershipComparison;