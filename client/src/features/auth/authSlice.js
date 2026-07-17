import { createSlice } from "@reduxjs/toolkit";

// for debugging purpose:
console.log("authslice...")

const initialState = {
    user: null,
    isAuthenticated: false,
    checkingAuth: true,  // Defaults to true on page load
    // loading: false,
    // error: null          // Added to handle login/signup failures
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.checkingAuth = false; // Once we have the user, we are done checking
            // state.error = null;         // Clear any previous errors
        },

        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.checkingAuth = false; // Done checking, they are officially logged out
        },

        // setLoading: (state, action) => {
        //     state.loading = action.payload;
        // },

        // setCheckingAuth: (state, action) => {
        //     state.checkingAuth = action.payload;
        // },

        // setError: (state, action) => {
        //     state.error = action.payload;
        // }
    }
})

export const {
    setUser,
    clearUser,
    // setLoading,
    // setCheckingAuth,
    // setError
} = authSlice.actions;

export default authSlice.reducer;