import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  fullName: null,
  id: null,
  role: null,
  token: null,
  address: [],
  avatarUrl: null,
  phoneNumber: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USER_DEFAULT_ADDRESS: (state, action) => {
      state.address = action.payload.address;
    },

    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const {
        email,
        fullName,
        id,
        roleName,
        token,
        address,
        phoneNumber,
        avatarUrl,
      } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.fullName = fullName;
      state.id = id;
      state.roleName = roleName;
      state.token = token;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.avatarUrl = avatarUrl;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.fullName = null;
      state.id = null;
      state.roleName = null;
      state.token = null;
      state.address = null;
      state.phoneNumber = null;
      state.avatarUrl = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_USER_DEFAULT_ADDRESS } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectFullName = (state) => state.auth.fullName;
export const selectUserId = (state) => state.auth.id;
export const selectUserRole = (state) => state.auth.roleName;
export const selectUserToken = (state) => state.auth.token;
export const selectDefaultAddress = (state) => state.auth.address;
export const selectDefaultPhoneNumber = (state) => state.auth.phoneNumber;
export const selectAvatarUrl = (state) => state.auth.avatarUrl;

export const selectUserInfo = (state) => state.auth;
export default authSlice.reducer;
