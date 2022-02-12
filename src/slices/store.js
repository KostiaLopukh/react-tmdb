import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "./moviseSlice/moviesSlice";

const store = configureStore({
    reducer: {
        moviesReducer
    }
})

export default store