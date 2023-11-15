import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import categoryReducer from './slice/categorySlice';
import couponReducer from './slice/couponSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  coupon: couponReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
