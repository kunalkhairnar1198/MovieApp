import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./Features/Ui-slice/ui-slice";
import authReducer from "./Features/Auth-slice/auth-slice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        ui:uiReducer  ,  
    }
})