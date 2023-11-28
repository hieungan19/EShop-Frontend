import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  customers: [],
};
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    STORE_CUSTOMERS(state, action) {
      state.customers = action.payload.customers;
    },
  },
});
export const { STORE_CUSTOMERS } = customerSlice.actions;
export const selectCategories = (state) => state.category.categories;
export default customerSlice.reducer;
