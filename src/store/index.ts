import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.ts";
// import userDataReducer from "./userDataSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
