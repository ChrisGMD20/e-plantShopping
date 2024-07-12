import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartCount: 0,
    cartTotalAmount: 0,
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      state.cartCount++;
      state.cartTotalAmount += action.payload.cost;
      const existingItem =
        state.items.length &&
        state.items.find((item) => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total += action.payload.cost;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const existingItem =
        state.items.length &&
        state.items.find((item) => item.name === action.payload);
      state.cartCount -= existingItem.quantity;
      state.cartTotalAmount -= existingItem.total;
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      state.cartCount += action.payload.quantity;
      const existingItem =
        state.items.length &&
        state.items.find((item) => item.name === action.payload.name);
      state.cartTotalAmount += action.payload.quantity * existingItem.cost;
      existingItem.total += existingItem.cost * action.payload.quantity;
      existingItem.quantity += action.payload.quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
