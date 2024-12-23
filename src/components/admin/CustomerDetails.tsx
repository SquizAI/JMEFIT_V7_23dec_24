import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Calendar, CreditCard, MessageSquare, 
  Activity, ShoppingBag, ChevronDown, ChevronUp 
} from 'lucide-react';
import type { Customer, CustomerNote } from '../../types/crm';
import { CRMService } from '../../services/crm';

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState('general');
  const [loading, setLoading] = useState(false);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    setLoading(true);
    try {
      await CRMService.addCustomerNote(customer.id, newNote, noteType);
      setNewNote('');
      // Refresh customer data
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-zinc-900 rounded-lg overflow-hidden"
    >
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-[#3dd8e8]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{customer.display_name}</h2>
              <p className="text-gray-400">{customer.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#3dd8e8] text-black'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'activity'
                ? 'bg-[#3dd8e8] text-black'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'notes'
                ? 'bg-[#3dd8e8] text-black'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Notes
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member Since</span>
                </div>
                <p>{new Date(customer.created_at).toLocaleDateString()}</p>
              </div>
              <div className="bg-black p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Subscription</span>
                </div>
                <p className="capitalize">{customer.subscription?.plan || 'Free'}</p>
              </div>
            </div>

            <div className="bg-black p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Recent Orders</h3>
              {customer.orders?.length ? (
                <div className="space-y-4">
                  {customer.orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-[#3dd8e8]">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No orders yet</p>
              )}
            </div>

            <div className="bg-black p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Progress Tracking</h3>
              {customer.progress?.length ? (
                <div className="space-y-4">
                  {customer.progress.slice(0, 3).map((progress) => (
                    <div key={progress.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {new Date(progress.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-400">
                          Weight: {progress.weight}lbs
                          {progress.body_fat && ` • Body Fat: ${progress.body_fat}%`}
                        </p>
                      </div>
                      <Activity className="w-5 h-5 text-[#3dd8e8]" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No progress data yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
                >
                  <option value="general">General</option>
                  <option value="support">Support</option>
                  <option value="billing">Billing</option>
                  <option value="training">Training</option>
                </select>
                <button
                  onClick={handleAddNote}
                  disabled={loading || !newNote.trim()}
                  className="px-4 py-2 bg-[#3dd8e8] text-black rounded-lg disabled:opacity-50"
                >
                  Add Note
                </button>
              </div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8] resize-none"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              {customer.notes?.map((note) => (
                <div key={note.id} className="bg-black p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      note.type === 'support' ? 'bg-blue-500/20 text-blue-400' :
                      note.type === 'billing' ? 'bg-purple-500/20 text-purple-400' :
                      note.type === 'training' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {note.type}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerDetails;