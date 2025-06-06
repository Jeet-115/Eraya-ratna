import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null, // ✅ No need to initialize from sessionStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = null; // ✅ or just skip setting token entirely
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
