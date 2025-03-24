import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setAuth } from "./slices/authSlice";
import Cookies from "js-cookie";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Restore auth state from cookies
const token = Cookies.get("authToken");
if (token) {
    store.dispatch(setAuth({ user: JSON.parse(token), authenticated: true }));
}

export default store;
