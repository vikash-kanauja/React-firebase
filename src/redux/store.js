import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import userDataReducer from "./reducer/userDataReducer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: userDataReducer,
  }
});
