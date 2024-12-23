import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Shirt } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import MainLayout from '../../components/layouts/MainLayout';

const Merchandise = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { dispatch } = useCart();

  const products = [
    {
      id: 'classic-tee',
      title: 'Classic Training Tee',
      category: 'apparel',
      description: 'Comfortable and breathable training t-shirt',
      price: 29.99,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'performance-hoodie',
      title: 'Performance Hoodie',
      category: 'apparel',
      description: 'Premium athletic hoodie for training and lifestyle',
      price: 54.99,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleAddToCart = (product: any, size: string, quantity: number) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${product.id}-${size}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
        size,
        image: product.image
      }
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Merchandise</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search merchandise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              >
                <option value="all">All Categories</option>
                <option value="apparel">Apparel</option>
                <option value="accessories">Accessories</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <Shirt className="w-6 h-6 text-[#3dd8e8]" />
                  </div>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: size })}
                        className={`px-3 py-1 rounded transition-colors ${
                          selectedSizes[product.id] === size
                            ? 'bg-[#3dd8e8] text-black'
                            : 'bg-black hover:bg-zinc-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gray-400">Quantity:</span>
                    <div className="flex items-center gap-2 bg-black rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="px-3 py-1 hover:bg-zinc-800 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-3">{quantities[product.id] || 1}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="px-3 py-1 hover:bg-zinc-800 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#3dd8e8]">
                      ${product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const selectedSize = selectedSizes[product.id];
                        if (selectedSize) {
                          handleAddToCart(product, selectedSize, quantities[product.id] || 1);
                        }
                      }}
                      disabled={!selectedSizes[product.id]}
                      className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {selectedSizes[product.id] ? 'Add to Cart' : 'Select Size'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Merchandise;