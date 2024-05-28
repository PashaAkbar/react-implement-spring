import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isLogin', true);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('isLogin');
      localStorage.removeItem('token');
    },
  },
});

export const {login, logout} = authSlice.actions;

export const selectAuth = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
