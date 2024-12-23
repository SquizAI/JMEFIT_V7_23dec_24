import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartIcon = () => {
  const { state, dispatch } = useCart();

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative p-2"
      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
    >
      <ShoppingBag className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#3dd8e8] text-black w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
    </motion.button>
  );
};

export default CartIcon;