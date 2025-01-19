import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./Features/Ui-slice/ui-slice";
import authReducer from "./Features/Auth-slice/auth-slice";
import moviesReducer from "./Features/Movies-slice/movies-slice";

const Store = configureStore({
    reducer:{
        auth:authReducer,
        movies:moviesReducer,
        ui:uiReducer,  
    }
})
export default Store