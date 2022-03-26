import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "./moviseSlice/moviesSlice";
import authReducer from "./authSlice/authSlice";

const store = configureStore({
    reducer: {
        moviesReducer,
        authReducer
    }
})

export default store
