import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",

  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});


export default authSlice;