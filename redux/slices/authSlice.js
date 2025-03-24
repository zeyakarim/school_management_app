import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    authenticated: false,
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.authenticated = action.payload.authenticated;
            state.loading = false;

            if (action.payload.authenticated) {
                Cookies.set("authToken", JSON.stringify(action.payload.user), { expires: 7 }); // Store for 7 days
            } else {
                Cookies.remove("authToken");
            }
            },
        reset: () => {
            Cookies.remove("authToken");
            return initialState;
        },
    },
});

export const { setAuth, reset } = authSlice.actions;
export default authSlice.reducer;

