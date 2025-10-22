import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find((it) => it.id === action.payload.id);
      if (exists) {
        // If item exists, increment its quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }
      // Add new item with quantity 1
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART': {
      return { ...state, cart: state.cart.filter((it) => it.id !== action.payload) };
    }
    case 'INCREASE_QTY': {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
    }
    case 'DECREASE_QTY': {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.find((it) => it.id === action.payload.id);
      if (exists) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }
    case 'REMOVE_FROM_WISHLIST': {
      return { ...state, wishlist: state.wishlist.filter((it) => it.id !== action.payload) };
    }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  // initialize from localStorage if available
  const initializer = (init) => {
    try {
      const raw = localStorage.getItem('dcode_cart_state');
      if (!raw) return init;
      const parsed = JSON.parse(raw);
      // validate shape
      return {
        cart: Array.isArray(parsed.cart) ? parsed.cart : init.cart,
        wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : init.wishlist,
      };
    } catch (e) {
      console.warn('Failed to parse cart state from localStorage', e);
      return init;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState, initializer);

  // persist to localStorage whenever state changes
  React.useEffect(() => {
    try {
      localStorage.setItem('dcode_cart_state', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save cart state to localStorage', e);
    }
  }, [state]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined) throw new Error('useCartState must be used within CartProvider');
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined) throw new Error('useCartDispatch must be used within CartProvider');
  return ctx;
}

export default CartProvider;
