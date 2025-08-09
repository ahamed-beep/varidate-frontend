// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../components/Redux/Profile";
import authReducer from "../components/Redux/Auth";

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

// Configure store without redux-persist
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
