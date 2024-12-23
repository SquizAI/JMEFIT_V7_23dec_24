import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartService } from '../services/cart';
import { useAuth } from './AuthContext';
import type { CartItem, CartAction, CartState } from '../types/cart';

const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Add error handling for cart operations
  const dispatchWithErrorHandling = (action: CartAction) => {
    try {
      dispatch(action);
    } catch (error) {
      console.error('Cart operation failed:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to update cart. Please try again.' 
      });
    }
  };

  // Load cart from database on mount and user change
  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;
      if (state.loading) return;

      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        let cart = await CartService.getCart(user.id);
        
        if (!cart) {
          try {
            cart = await CartService.createCart(user.id);
          } catch (err) {
            console.error('Failed to create cart:', err);
            return;
          }
        }
        
        if (!cart?.id) {
          console.error('No cart ID found');
          return;
        }
        
        const items = await CartService.getCartItems(cart.id);
        
        dispatch({ type: 'CLEAR_CART' });
        items?.forEach(item => {
          dispatch({
            type: 'ADD_ITEM',
            payload: {
              id: item.id,
              productId: item.product_id,
              quantity: item.quantity,
              price: item.products?.price || 0,
              name: item.products?.name || '',
              image: item.products?.images?.[0]
            }
          });
        });

      } catch (error) {
        console.error('Failed to load cart:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCart();
  }, [user]);

  // Sync cart changes to database
  useEffect(() => {
    const syncCart = async () => {
      if (!user || state.loading) return;
      if (state.items.length === 0) return;

      try {
        let cart = await CartService.getCart(user.id);
        
        if (!cart) {
          cart = await CartService.createCart(user.id);
          if (!cart?.id) {
            throw new Error('Failed to create cart');
          }
        }
        
        await CartService.clearCart(cart.id);
        
        for (const item of state.items) {
          await CartService.addItem(cart.id, item.productId, item.quantity);
        }
        
      } catch (error) {
        console.error('Failed to sync cart:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to sync cart' });
      }
    };
    
    syncCart();
  }, [state.items, user]);

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch: dispatchWithErrorHandling
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};