import { createSlice } from "@reduxjs/toolkit";

const initialUiState ={
        valid:false,
        validText:''
}   

const uiSlice = createSlice({
    name:'ui',
    initialState:initialUiState,
    reducers:{
        isValid(state, action){

        },
        isErrorMessage(state, action){
            state.validText = action.payload  
            console.log(action.payload)
        }

    }
})

export const UiActions = uiSlice.actions;
export default uiSlice.reducer