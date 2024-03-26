import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { emailSlice } from "./emailSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        email:emailSlice.reducer,
        ui:uiSlice.reducer,
    }
})

export default store;