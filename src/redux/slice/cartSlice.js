import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  selectedItems: [],
  couponId: null,
  address: [],
  orderUserName: '',
  orderPhoneNumber: '',
  orderPaymentMethod: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    STORE_ORDER_ADDRESS: (state, action) => {
      state.address = action.payload.address;
    },
    STORE_ORDER_USER_NAME: (state, action) => {
      state.orderUserName = action.payload.orderUserName;
    },

    STORE_ORDER_PHONENUMBER: (state, action) => {
      state.orderPhoneNumber = action.payload.orderPhoneNumber;
    },

    STORE_ORDER_PAYMENT_METHOD: (state, action) => {
      state.orderPaymentMethod = action.payload.orderPaymentMethod;
    },

    STORE_CART_DISCOUNT: (state, action) => {
      state.couponId = action.payload.couponId;
    },
    STORE_ITEMS_TO_CART: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.cartTotalQuantity = action.payload.cartItems.length;
    },

    CHANGE_BILL: (state, action) => {
      state.total = action.payload.total;
      state.realTotal = action.payload.realTotal;
      state.couponId = action.payload.couponId;
    },

    SELECT_ITEM: (state, action) => {
      state.selectedItems.push(action.payload.item);
    },
    REMOVE_SELECTED_ITEM: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        (i) => i.id !== action.payload.item.id
      );
    },
    RESET_SELECTED_ITEMS: (state, action) => {
      state.selectedItems = [];
    },
  },
});

export const {
  STORE_ITEMS_TO_CART,
  SELECT_ITEM,
  REMOVE_SELECTED_ITEM,
  STORE_CART_DISCOUNT,
  STORE_ORDER_ADDRESS,
  STORE_ORDER_PAYMENT_METHOD,
  STORE_ORDER_USER_NAME,
  STORE_ORDER_PHONENUMBER,
  RESET_SELECTED_ITEMS,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectSelectedItems = (state) => state.cart.selectedItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCouponId = (state) => state.cart.couponId;
export const selectTotal = (state) => state.cart.total;
export const selectRealTotal = (state) => state.cart.realTotal;
export const selectAddress = (state) => state.cart.address;
export const selectOrderUserName = (state) => state.orderUserName;
export const selectOrderPhoneNumber = (state) => state.orderPhoneNumber;
export const selectOrderPaymentMethod = (state) => state.orderPaymentMethod;

export default cartSlice.reducer;
