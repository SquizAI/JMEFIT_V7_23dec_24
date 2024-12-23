import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, User, Calendar } from 'lucide-react';
import type { Customer } from '../../types/crm';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelectCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubscription, setFilterSubscription] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubscription = 
      filterSubscription === 'all' || 
      customer.subscription?.plan === filterSubscription;

    return matchesSearch && matchesSubscription;
  });

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
        <select
          value={filterSubscription}
          onChange={(e) => setFilterSubscription(e.target.value)}
          className="px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
        >
          <option value="all">All Plans</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
          <option value="elite">Elite</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black p-4 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors"
            onClick={() => onSelectCustomer(customer)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#3dd8e8]" />
                </div>
                <div>
                  <h3 className="font-semibold">{customer.display_name}</h3>
                  <p className="text-sm text-gray-400">{customer.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  customer.subscription?.status === 'active'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {customer.subscription?.plan || 'Free'}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(customer.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No customers found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;