import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: ['burger', 'pizza'],
  },
  reducers: {
    addItem: (state, payload) => {
      //Mutating state
      state.items.push(payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearcart: (state) => {
      state.items.length = [];
    },
  },
});

export const { addItem, removeItem, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
