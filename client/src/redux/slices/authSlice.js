import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage,
    user: null, // Will be fetched using token later
    loading: false, // Add loading state
    isAuthenticated: !!tokenFromStorage, // Add isAuthenticated state
    error: null, // Add error state
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      state.isAuthenticated = true; // Set isAuthenticated to true
      localStorage.setItem("token", state.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false; // Set isAuthenticated to false
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Update isAuthenticated based on user
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error state
    },
  },
});

export const { login, logout, setUser, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
