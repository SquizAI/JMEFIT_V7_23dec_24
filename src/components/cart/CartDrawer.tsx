import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const CartDrawer = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch({ type: 'TOGGLE_CART' });
    navigate('/checkout');
  };

  if (!state.isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 p-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-xl font-bold">Shopping Cart</h2>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 hover:bg-zinc-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {state.items.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 mb-8">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-black p-4 rounded-lg"
                  >
                    <Link 
                      to={`/shop/products/${item.productId}`} 
                      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.image || ''}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link 
                        to={`/shop/products/${item.productId}`}
                        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                        className="font-semibold hover:text-[#3dd8e8] transition-colors"
                      >
                        {item.title}
                      </Link>
                      {item.size && (
                        <p className="text-sm text-gray-400 mt-1">Size: {item.size}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: {
                                  id: item.id,
                                  size: item.size,
                                  quantity: Math.max(1, item.quantity - 1)
                                }
                              })
                            }
                            className="p-1 hover:bg-zinc-800 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'UPDATE_QUANTITY',
                                payload: {
                                  id: item.id,
                                  size: item.size,
                                  quantity: item.quantity + 1
                                }
                              })
                            }
                            className="p-1 hover:bg-zinc-800 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'REMOVE_ITEM',
                              payload: item.id
                            })
                          }
                          className="text-red-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-[#3dd8e8] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-[#3dd8e8] font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#3dd8e8] text-black py-3 rounded-lg font-semibold hover:bg-[#34c5d3] transition-colors"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDrawer;