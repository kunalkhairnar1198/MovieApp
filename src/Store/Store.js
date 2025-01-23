import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
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
  blacklist: ['loading'], 
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  movies: persistReducer(moviesPersistConfig, moviesReducer),
  ui: uiReducer, 
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        immutableCheck: false,
    serializableCheck: false,
      },
    }).concat(thunk), 
});

export const persistor = persistStore(store);

export default store;
