import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: true,
  email: null,
  fullName: null,
  id: 1,
  role: null,
  token:
    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIlVzZXJJZCI6IjciLCJzdWIiOiI3IiwiZXhwIjoxNzAxNjk5NTA2LCJpc3MiOiJFU2hvcCIsImF1ZCI6IkVTaG9wIn0.IsP0KIvVyYZfvD0Q9RUV-nLWK_o8eHsXDoJrvS_coy4',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const { email, fullName, id, roleName, token } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.fullName = fullName;
      state.id = id;
      state.roleName = roleName;
      state.token = token;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.fullName = null;
      state.id = null;
      state.roleName = null;
      state.token = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectFullName = (state) => state.auth.fullName;
export const selectUserId = (state) => state.auth.id;
export const selectUserRole = (state) => state.auth.roleName;
export const selectUserToken = (state) => state.auth.token;
export default authSlice.reducer;
