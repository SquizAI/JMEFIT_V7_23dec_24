import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ProductService } from '../../services/products';

interface ProgramCTAProps {
  text: string;
  path: string;
  programId?: string;
}

const ProgramCTA: React.FC<ProgramCTAProps> = ({ text, path, programId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (programId) {
        const program = await ProductService.getProgramById(programId);
        if (program) {
          dispatch({
            type: 'ADD_ITEM',
            payload: {
              id: program.id,
              productId: program.id,
              title: program.title,
              price: program.price,
              quantity: 1
            }
          });
        }
      }
      
      if (!user) {
        navigate('/signup', { 
          state: { 
            from: '/checkout',
            programAdded: true 
          } 
        });
      } else {
        navigate('/checkout');
      }
    } catch (error) {
      console.error('Error adding program to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-sm md:static md:bg-transparent md:backdrop-blur-none md:p-0 z-40">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        disabled={loading}
        className="w-full md:w-auto md:min-w-[200px] bg-[#3dd8e8] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#34c5d3] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {text}
        <span className="text-sm">(Create Account)</span>
      </motion.button>
    </div>
  );
};

export default ProgramCTA;