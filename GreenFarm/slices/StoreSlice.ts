import { createSlice } from "@reduxjs/toolkit";
import type { Store } from "@/types/types";

interface StoresState {
    business_stores:Store[],
    suggested_stores:Store[],
    all_stores:Store[],
    store_data:Store | null
};

const initialState:StoresState = {
    business_stores:[],
    suggested_stores:[],
    all_stores:[],
    store_data:null
}

const storeSlice = createSlice({
    name:"stores",
    initialState,
    reducers:{
        
        setBusinessStores:(state,action)=>{
            state.business_stores = action.payload
        },
        setSuggestedStores:(state,action)=>{
            state.suggested_stores = action.payload
        },
        setStoreData:(state,action)=>{
            state.store_data = action.payload
        }
    }
});

export const {setBusinessStores,setStoreData,setSuggestedStores} = storeSlice.actions;
export default storeSlice.reducer