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
    updateUserRoleAction: (state, action) => {
      const { userId, newRole } = action.payload;
      const user = state.users.find((user) => user._id === userId);
      if (user) {
        user.role = newRole;
      }
    },
  },
});

export const { getUsersContent, deleteUser, addNewUser, updateUserRoleAction } =
  userSlice.actions;
export default userSlice.reducer;
