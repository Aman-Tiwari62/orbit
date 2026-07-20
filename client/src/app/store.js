import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import feedReducer from "../features/posts/feedSlice";
console.log("store.....")
export const store = configureStore({
    reducer:{
        auth:authReducer,
        feed:feedReducer
    }
})