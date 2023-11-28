import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  selectedItems: [],
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    STORE_ITEMS_TO_CART: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.cartTotalQuantity = action.payload.cartItems.length;
    },

    SELECT_ITEM: (state, action) => {
      state.selectedItems.push(action.payload.item);
    },
    REMOVE_SELECTED_ITEM: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        (i) => i.id !== action.payload.item.id
      );
    },
  },
});

export const { STORE_ITEMS_TO_CART, SELECT_ITEM, REMOVE_SELECTED_ITEM } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectSelectedItems = (state) => state.cart.selectedItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export default cartSlice.reducer;
