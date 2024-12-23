import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const TestProduct = () => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: 'e8c9acf1-5c5f-4f8b-a9c2-3f2d7a571c5c',
        productId: 'e8c9acf1-5c5f-4f8b-a9c2-3f2d7a571c5c',
        title: 'Test Product',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
      }
    });
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Test Product</h2>
      <p className="text-gray-400 mb-4">$29.99</p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        className="flex items-center gap-2 bg-[#3dd8e8] text-black px-4 py-2 rounded-lg"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </motion.button>
    </div>
  );
};

export default TestProduct;