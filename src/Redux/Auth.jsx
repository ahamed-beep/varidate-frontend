import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axiosinstance from "../Connection/Api";
export const siginuserform = createAsyncThunk(
    'signupuser',
    async(user ,Credential)=>{
        const responce = await axiosinstance.post('/signup',user)
        console.log(responce.data)
        return responce.data.user
        
    }
);
export const loginuserform = createAsyncThunk(
    'loginuser',
    async(user , Credential)=>{
        const fetch = await axiosinstance.post('/loginuser',user);
        console.log(fetch.data)
        return fetch.data.user
    }
)
const authslice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        error:null,
        token:false,
        authenticated:false,
        loading:false
    },
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(siginuserform.pending, (state)=>{
            state.loading=true,
            state.user = null
        }),
        builder.addCase(siginuserform.fulfilled , (state,action)=>{
            state.user = action.payload;
            state.authenticated = true;
            state.loading = false;
        }),
        builder.addCase(siginuserform.rejected,(state,action)=>{
            state.error = action.payload;
            state.user = null;
        }),
        builder.addCase(loginuserform.pending , (state)=>{
            state.loading=true;
            state.user = null;
            state.token = null;
        }),
        builder.addCase(loginuserform.fulfilled , (state , action)=>{
            state.user = action.payload;
            state.token = action.payload;
            state.authenticated = true;
            state.loading = false ;
        }),
        builder.addCase(loginuserform.rejected , (state,action)=>{
          state.error = action.payload;
          state.user = null;
          state.token = null;
        })
    }
})
export default authslice.reducer;
export const {logout} = authslice.actions