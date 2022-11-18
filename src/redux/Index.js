import {configureStore,} from "@reduxjs/toolkit";
import userSlice from "./createSlice/createSlice"

export default configureStore({
    reducer: {
        users: userSlice, 
    },
})
