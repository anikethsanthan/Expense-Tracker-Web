import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (_, action) => {
      return action.payload;
    },
    removeUser: () => {
      // Clear localStorage
      localStorage.removeItem("token");

      // Clear cookies
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Clear sessionStorage
      sessionStorage.clear();

      // Return null to reset the state
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
