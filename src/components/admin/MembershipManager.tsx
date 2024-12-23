import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Check } from 'lucide-react';
import type { Database } from '../../types/supabase';

type Membership = Database['public']['Tables']['memberships']['Row'];

interface MembershipManagerProps {
  memberships: Membership[];
  onAdd: () => void;
  onEdit: (membership: Membership) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: 'active' | 'inactive') => void;
}

const MembershipManager: React.FC<MembershipManagerProps> = ({
  memberships,
  onAdd,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Memberships</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAdd}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Membership
        </motion.button>
      </div>

      <div className="grid gap-4">
        {memberships.map((membership) => (
          <motion.div
            key={membership.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-900 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">{membership.name}</h3>
                <p className="text-gray-400">{membership.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleStatus(
                    membership.id,
                    membership.status === 'active' ? 'inactive' : 'active'
                  )}
                  className={`px-3 py-1 rounded-full text-sm ${
                    membership.status === 'active'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-gray-500/20 text-gray-500'
                  }`}
                >
                  {membership.status === 'active' ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => onEdit(membership)}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-[#3dd8e8]"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(membership.id)}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-400">Monthly Price</span>
                <p className="text-lg font-semibold">${membership.price_monthly}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Yearly Price</span>
                <p className="text-lg font-semibold">${membership.price_yearly}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-sm text-gray-400">Features</span>
              <div className="mt-2 space-y-2">
                {JSON.parse(membership.features as string).map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3dd8e8]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MembershipManager;