import { createSlice } from "@reduxjs/toolkit";

const authenticationDataState ={
        logedInUser:[],
        RegisterUser:[]
}

const authSlice = createSlice({
    name:'auth',
    initialState:authenticationDataState,
    reducers:{
        RegisterUser(state, action){
            state.RegisterUser = action.payload
            console.log(state.RegisterUser)
        },
        LoginUser(state, action){
                state.logedInUser = action.payload;
                console.log(state.logedInUser)
        },
        LogoutUser(state, action){

        }
    }
})

export const AuthActions = authSlice.actions;
export default authSlice.reducer