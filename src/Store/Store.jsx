import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "../Redux/Slider";
import authReducer from '../Redux/Auth';
import productReducer from '../Redux/Product';

const store = configureStore({
  reducer: {
    sliderslice: sliderReducer,
    authslice: authReducer,
    productslice: productReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Correct placement of devTools config
});

export default store;
