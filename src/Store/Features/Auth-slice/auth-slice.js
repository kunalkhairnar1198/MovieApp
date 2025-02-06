import { createSlice } from "@reduxjs/toolkit";

const authenticationDataState = {
    registeredUsers: [], 
    logedInUser: null, 
    token: false,
    loading: false,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState: authenticationDataState,
    reducers: {
      registerUser(state, action) {
        const newUser = action.payload;
        const existingUser = state.registeredUsers.find(
          (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
        );
  
        if (!existingUser) {
          state.registeredUsers.push(newUser); 
          console.log("Registered users:", state.registeredUsers);
        } else {
          console.log("User with this email already exists");
        }
      },
      loginUser(state, action) {
        const { email, password } = action.payload;
  
        const foundUser = state.registeredUsers.find(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );
  
        if (foundUser) {
          state.token = true;
          state.loading = false;
          state.logedInUser = foundUser;
          console.log("Logged-in user:", state.logedInUser);
        } else {
          state.token = false;
          state.loading = false;
          state.logedInUser = null;
          console.log("Invalid credentials");
        }
      },
      loadUser(state, action) {
        state.loading = action.payload;
      },
      logOutUser(state) {
        state.token = false;
        state.loading = false;
        state.logedInUser = null;
      },
      deleteUser(state, action){
        const indexToRemove = state.registeredUsers.findIndex(obj => obj.id === action.payload.id)
        state.registeredUsers.splice(indexToRemove ,1 )
      }
    },
  });

export const AuthActions = authSlice.actions;
export default authSlice.reducer


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



