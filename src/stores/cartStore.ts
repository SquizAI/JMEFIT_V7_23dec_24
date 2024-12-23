import { atom } from 'jotai';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false
};

export const cartAtom = atom<CartState>(initialState);

export const cartActionsAtom = atom(
  null,
  (get, set, action: { type: string; payload?: any }) => {
    const cart = get(cartAtom);

    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItem = cart.items.find(item => 
          item.id === action.payload.id && 
          item.size === action.payload.size
        );

        if (existingItem) {
          set(cartAtom, {
            ...cart,
            items: cart.items.map(item =>
              item.id === action.payload.id && item.size === action.payload.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set(cartAtom, {
            ...cart,
            items: [...cart.items, { ...action.payload, quantity: 1 }]
          });
        }
        break;
      }

      case 'REMOVE_ITEM':
        set(cartAtom, {
          ...cart,
          items: cart.items.filter(item => 
            !(item.id === action.payload.id && item.size === action.payload.size)
          )
        });
        break;

      case 'UPDATE_QUANTITY':
        set(cartAtom, {
          ...cart,
          items: cart.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        });
        break;

      case 'CLEAR_CART':
        set(cartAtom, { ...initialState });
        break;

      case 'TOGGLE_CART':
        set(cartAtom, { ...cart, isOpen: !cart.isOpen });
        break;
    }
  }
);