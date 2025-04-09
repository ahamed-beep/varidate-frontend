import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "../Redux/Slider"
import authReducer from '../Redux/Auth'
const store = configureStore({
 reducer:{
    sliderslice : sliderReducer,
    authslice : authReducer,
     devTools:process.env.NODE_ENV!=="production"
 }
})
export default store