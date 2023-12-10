import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  coupons: [],
};
const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    STORE_COUPONS(state, action) {
      state.coupons = action.payload.coupons;
    },
  },
});
export const { STORE_COUPONS } = couponSlice.actions;
export const selectCoupons = (state) => state.coupon.coupons;
export default couponSlice.reducer;
