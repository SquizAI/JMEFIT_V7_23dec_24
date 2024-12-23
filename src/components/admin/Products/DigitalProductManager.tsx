import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Download } from 'lucide-react';
import { db } from '../../../db';

const DigitalProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const results = await db.all('SELECT * FROM digital_products ORDER BY created_at DESC');
        setProducts(results);
      } catch (error) {
        console.error('Error loading digital products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3dd8e8]">Digital Products</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-zinc-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
        >
          <option value="all">All Types</option>
          <option value="guide">Guides</option>
          <option value="plan">Plans</option>
          <option value="recipe_book">Recipe Books</option>
          <option value="cheat_sheet">Cheat Sheets</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3dd8e8] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <FileText className="w-6 h-6 text-[#3dd8e8]" />
                </div>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#3dd8e8]">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Download className="w-4 h-4" />
                    {product.downloads} downloads
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.type === 'guide' ? 'bg-blue-500/20 text-blue-400' :
                    product.type === 'plan' ? 'bg-green-500/20 text-green-400' :
                    product.type === 'recipe_book' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {product.type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                  {product.preview_url && (
                    <a
                      href={product.preview_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3dd8e8] hover:text-[#34c5d3] text-sm"
                    >
                      Preview
                    </a>
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

export default DigitalProductManager;