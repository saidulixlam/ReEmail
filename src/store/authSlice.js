import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isLoggedIn: false,
}
export const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers : {
        login(state, action) {
            localStorage.setItem('token', action.payload);
            state.token = action.payload
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            state.token = null;
            state.isLoggedIn = false;
        }
    }
})

export const authActions=authSlice.actions;