import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "@react-native-async-storage/async-storage"; 
import authReducer from "./Features/Auth-slice/auth-slice";
import moviesReducer from "./Features/Movies-slice/movies-slice";
import uiReducer from "./Features/Ui-slice/ui-slice";
import { thunk } from "redux-thunk";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "logedInUser"], 
};

const moviesPersistConfig = {
  key: "movies",
  storage,
  whitelist:[ 'movieWatchList','favoriteMovieList', 'watchRead', 'FavRead'],
  blacklist: ['loading'], 
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistMovieReducer = persistReducer(moviesPersistConfig, moviesReducer)

const rootReducer = combineReducers({
    auth:persistAuthReducer,
    movies: persistMovieReducer,
    ui : uiReducer,
})


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk), 
});

export const persistor = persistStore(store);

export default store;
