import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../Connection/Api";
export const postallproducts = createAsyncThunk(
    'postallproducts',
    async(product)=>{
        const responce= await axiosinstance.post('/productcard',product)
        console.log(responce)
        return  responce.data.product
    }
)
const productslice = createSlice({
    name:'productslice',
    initialState:{
        product:[],
        error:null,
        loading:false
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(postallproducts.pending, (state) => {
          state.product = [];
          state.loading = true;
        });
        builder.addCase(postallproducts.fulfilled, (state, action) => {
          state.product = action.payload;
          state.loading = false;
        });
        builder.addCase(postallproducts.rejected, (state, action) => {
          state.product = [];
          state.error = action.error.message;  // Use action.error.message
        });
      }
      
})

export default productslice.reducer;
