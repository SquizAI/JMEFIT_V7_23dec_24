import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, ShoppingCart } from 'lucide-react';
import { db } from '../../../db';

const GroceryListManager = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadLists = async () => {
      try {
        const results = await db.all('SELECT * FROM grocery_lists ORDER BY created_at DESC');
        setLists(results);
      } catch (error) {
        console.error('Error loading grocery lists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, []);

  const filteredLists = lists.filter(list =>
    list.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Grocery Lists</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Create List
        </motion.button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search lists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3dd8e8] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading grocery lists...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.map((list) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{list.title}</h3>
                  <ShoppingCart className="w-6 h-6 text-[#3dd8e8]" />
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                  list.type === 'staples' 
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-green-500/20 text-green-500'
                }`}>
                  {list.type.charAt(0).toUpperCase() + list.type.slice(1)}
                </span>
                <div className="space-y-2">
                  {JSON.parse(list.items).slice(0, 5).map((item, index) => (
                    <div key={index} className="text-sm text-gray-400">
                      • {item}
                    </div>
                  ))}
                  {JSON.parse(list.items).length > 5 && (
                    <div className="text-sm text-gray-400">
                      + {JSON.parse(list.items).length - 5} more items
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroceryListManager;