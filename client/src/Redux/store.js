import { configureStore } from "@reduxjs/toolkit";
import userReduser from './Slice/user';
import cartReduser from "./Slice/cart";

export const store = configureStore({
  reducer: {
    user: userReduser,
    cart:cartReduser
  }
});