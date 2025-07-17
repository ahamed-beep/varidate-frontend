import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../Redux/Auth';
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig ={
  key : 'root',
  storage
};

const rootreducers = combineReducers({
authslice: authReducer,
})


const presistedreducers = persistReducer(persistConfig , rootreducers);

const store = configureStore({
  reducer : presistedreducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    })


});

export const persistor = persistStore(store)
export default store; 
