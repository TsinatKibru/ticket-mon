// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersContent: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },
    addNewUser: (state, action) => {
      state.users.push(action.payload.newUserObj);
    },
  },
});

export const { getUsersContent, deleteUser, addNewUser } = userSlice.actions;
export default userSlice.reducer;
