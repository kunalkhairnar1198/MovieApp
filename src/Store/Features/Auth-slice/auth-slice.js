import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'

const authenticationDataState ={
    logedInUser:[],
        user:null,      
        token:false,
        loading:false,
        error:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState:authenticationDataState,
    reducers:{                  
        RegisterUser(state, action){
            state.token = false
            state.logedInUser =action.payload
            console.log('register user',state.logedInUser)
        },
        LoginUser(state, action){
                state.token = true
                state.user = action.payload;
                console.log('logedin user',state.logedInUser)
        },
        LogoutUser(state, action){
                state.token = false
                // state.user = null
        },
    }   
})

export const AuthActions = authSlice.actions;


// export const registerUser = (userData) => async(dispatch)=>{
//     console.log(userData)
//     try {
//         const existingData = await AsyncStorage.getItem('user')
//         const parseData =   existingData ? JSON.parse(existingData) : []
//         const updateData = [...parseData, userData ]

//         await AsyncStorage.setItem('user', JSON.stringify(updateData))
//         await dispatch(AuthActions.RegisterUser(userData))  
//     } catch (error) {
//         console.log('failed to register user')
//     }
// }   

// export const getUserData =()=>{
//     return async(dispatch)=>{
//         try {
//             const users = await AsyncStorage.getItem('user')
//             const currentUser =users ? JSON.parse(users) :[]
//             console.log(currentUser)
//             dispatch(AuthActions.Getusers(currentUser))
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

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

