import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Pill, Info } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import MainLayout from '../../components/layouts/MainLayout';

const Supplements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { dispatch } = useCart();

  const products = [
    {
      id: 'whey-protein',
      title: 'Premium Whey Protein',
      category: 'protein',
      description: 'High-quality whey protein isolate for optimal muscle recovery',
      price: 49.99,
      size: '2 lbs',
      servings: 30,
      flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
      benefits: [
        'Supports muscle growth',
        'Fast absorption',
        'Low in lactose'
      ],
      image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pre-workout',
      title: 'Pre-Workout Formula',
      category: 'pre-workout',
      description: 'Enhanced energy and focus for intense workouts',
      price: 39.99,
      size: '300g',
      servings: 30,
      flavors: ['Blue Raspberry', 'Fruit Punch'],
      benefits: [
        'Increased energy',
        'Enhanced focus',
        'Improved performance'
      ],
      image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'creatine',
      title: 'Micronized Creatine',
      category: 'performance',
      description: 'Pure creatine monohydrate for strength and power',
      price: 24.99,
      size: '500g',
      servings: 100,
      flavors: ['Unflavored'],
      benefits: [
        'Increased strength',
        'Enhanced recovery',
        'Improved performance'
      ],
      image: 'https://images.unsplash.com/photo-1579722819151-2e57d0901880?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image
      }
    });
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Supplements</h1>
            <p className="text-gray-400">Premium supplements to support your fitness goals</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            >
              <option value="all">All Categories</option>
              <option value="protein">Protein</option>
              <option value="pre-workout">Pre-Workout</option>
              <option value="performance">Performance</option>
            </select>
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
                    <Pill className="w-6 h-6 text-[#3dd8e8]" />
                  </div>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{product.size}</span>
                      <span>•</span>
                      <span>{product.servings} servings</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Available Flavors</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.flavors.map((flavor) => (
                        <span
                          key={flavor}
                          className="px-3 py-1 bg-black rounded text-sm"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                          <Info className="w-4 h-4 text-[#3dd8e8]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#3dd8e8]">
                      ${product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
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

export default Supplements;