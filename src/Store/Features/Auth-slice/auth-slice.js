import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authenticationDataState ={
        allUsers:null,      
        RegisterUser:[],
}

const authSlice = createSlice({
    name:'auth',
    initialState:authenticationDataState,
    reducers:{                  
        Getusers(state, action){
            state.RegisterUser = action.payload
            console.log(state.RegisterUser)
        },
        RegisterUser(state, action){
            state.RegisterUser.push(action.payload)
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


export const registerUser = (userData) => async(dispatch)=>{
    console.log(userData)
    try {
        const existingData = await AsyncStorage.getItem('user')
        const parseData =   existingData ? JSON.parse(existingData) : []
        const updateData = [...parseData, userData ]

        await AsyncStorage.setItem('user', JSON.stringify(updateData))
        await dispatch(AuthActions.RegisterUser(userData))  
    } catch (error) {
        console.log('failed to register user')
    }
}   

export const getUserData =()=>{
    return async(dispatch)=>{
        try {
            const users = await AsyncStorage.getItem('user')
            const currentUser =users ? JSON.parse(users) :[]
            console.log(currentUser)
            dispatch(AuthActions.Getusers(currentUser))
        } catch (error) {
            console.log(error)
        }
    }
}

// export const clearData =()=>{
//     return async(dispatch)=>{
//         try {
//              await AsyncStorage.clear()
//              console.log('clear all data')
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }


export default authSlice.reducer

