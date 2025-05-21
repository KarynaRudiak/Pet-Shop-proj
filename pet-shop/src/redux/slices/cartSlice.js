import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLS = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart) {
      const parsedCart = JSON.parse(serializedCart);
      return parsedCart && Array.isArray(parsedCart.items) ? parsedCart : { items: [] };
    }
  } catch (err) {
    console.error("LocalStorage error:", err);
  }
  return { items: [] };
};

const saveCartToLS = (cartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartState));
  } catch (err) {
    console.error("LocalStorage error:", err);
  }
};

export const cartSlice = createSlice({
  name: "cart", 
  initialState: loadCartFromLS(),  
  reducers: {
    addToCart: (state, action) => {
      if (!state.items) state.items = [];
      const { id, title, image, price, discont_price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, quantity, title, image, price, discont_price });
      }
      saveCartToLS(state);
    },
    decrementFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);  
      } else {
        existingItem.quantity--;  
      }
      saveCartToLS(state);  
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity; 
      }
      saveCartToLS(state);  
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);  
      saveCartToLS(state); 
    },
    clearCart: (state) => {
      state.items = [];  
      saveCartToLS(state);  
    },
  },
});

export const { addToCart, decrementFromCart, updateQuantity, removeItem, clearCart,} = cartSlice.actions;
export default cartSlice.reducer;