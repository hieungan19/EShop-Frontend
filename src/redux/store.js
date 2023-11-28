import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import categoryReducer from './slice/categorySlice';
import couponReducer from './slice/couponSlice';
import productReducer from './slice/productSlice';
import orderReducer from './slice/orderSlice';
import customerReducer from './slice/customerSlice';
import cartReducer from './slice/cartSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  coupon: couponReducer,
  product: productReducer,
  order: orderReducer,
  customer: customerReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
