import { StoreForm } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    create_store:StoreForm
}

const initialState:FormState = {
    create_store:{
      name:"",
      description:"",
      dealing_in:[],
      location:{
          country:"",
          city:"",
          region:""
      },
      store_contacts:[],
      plan:""
    }
}

const formSlice = createSlice({
    name:"forms",
    initialState,
    reducers:{
       setNameAndDesc:(state,action:PayloadAction<{name:string,description:string}>)=>{
           state.create_store.name = action.payload.name;
           state.create_store.description = action.payload.description
       },

       setDealingIn:(state,action:PayloadAction<string[]>)=>{
           state.create_store.dealing_in = action.payload
       },

       setStoreLocationObject:(state,action:PayloadAction<{
       country:string,
       city:string,
       region:string }>)=>{
           state.create_store.location.country = action.payload.country;
           state.create_store.location.city = action.payload.city;
           state.create_store.location.region = action.payload.region
       },

       setStoreContactsArray:(state,action:PayloadAction<string[]>)=>{
           state.create_store.store_contacts = action.payload
       },

       setPaymentPlan:(state,action)=>{
         state.create_store.plan = action.payload
       }
    }
});

export const {
    setDealingIn,
    setNameAndDesc,
    setStoreContactsArray,
    setStoreLocationObject,
    setPaymentPlan
} = formSlice.actions;
export default formSlice.reducer