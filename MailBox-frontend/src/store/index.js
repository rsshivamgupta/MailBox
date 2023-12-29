import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
  },
});

export const authAction = authSlice.actions;
export const dataAction = dataSlice.actions;


export default store;
