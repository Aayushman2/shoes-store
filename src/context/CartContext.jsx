import React, { createContext, useReducer, useContext } from 'react';

// Define action types
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Initial state
const initialState = {
  items: [],
  cartTotal: 0,
  itemCount: 0
};

// Reducer function handling state changes
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;

      if (existingItemIndex > -1) {
        // Increment quantity if item exists
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
      } else {
        // Add new item with quantity 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return calculateCartTotals(newItems);
    }

    case ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return calculateCartTotals(newItems);
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return calculateCartTotals(newItems);
    }

    case ACTIONS.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}

// Helper function to recalculate totals
function calculateCartTotals(items) {
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return { items, cartTotal, itemCount };
}

// Create Context
const CartContext = createContext();

// Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Helper functions to dispatch actions
  const addToCart = (product) => dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
  const removeFromCart = (id) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
    }
  };
  const clearCart = () => dispatch({ type: ACTIONS.CLEAR_CART });

  const value = {
    cart: state.items,
    cartTotal: state.cartTotal,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to consume the Cart Context easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
