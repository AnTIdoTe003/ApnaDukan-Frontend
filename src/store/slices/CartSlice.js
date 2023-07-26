import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalPrice += newItem.price * newItem.quantity;
    },

    updateItemQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        const quantityDiff = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;

        state.totalPrice += itemToUpdate.price * quantityDiff;
      }
    },
    
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;