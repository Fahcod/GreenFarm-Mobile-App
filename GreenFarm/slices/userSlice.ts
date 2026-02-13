import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../types/types";
import { axiosInstance } from "../API/api";


type UserState = {
    data:User,
    loading:boolean,
    error:string | null,
    access_token:string | null,
    USER_ROLE:string
}

const initialState:UserState = {
   data:{
    _id:"",
    name:"",
    email:"",
    profile_pic:"",
    createdAt:null,
    updatedAt:null
   },
   loading:false,
   error:null,
   access_token:null,
   USER_ROLE:""
}

// the fetch user logic
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () =>{
          try {
        
          let response = await axiosInstance.get('/api/v1/user/fetch');
          if(response.status === 200){
             return response.data.data
          }
        
          } catch (error:any) {
            throw new Error(error);
          }
    }
)

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        
        setUserData:(state,action:PayloadAction<User>)=>{
            state.data = {...action.payload}
        },

        setUserRole:(state,action)=>{
           state.USER_ROLE = action.payload
        }
    },

    extraReducers(builder) {
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchUser.fulfilled,(state,action:PayloadAction<User>)=>{
            state.data = {...action.payload}
            state.loading = false
        })
        .addCase(fetchUser.rejected,(state,action:PayloadAction<any>)=>{
            state.loading = false,
            state.error = action.payload
        })
    },
});

export const {setUserData,setUserRole} = userSlice.actions;
export default userSlice.reducer
