import { createSlice } from "@reduxjs/toolkit";

interface sellerState {
    products_total:number,
    stores_total:number,
    store_products_total:number,
    store_reviews_total:number
}

const initialState:sellerState = {
    products_total:0,
    stores_total:0,
    store_products_total:0,
    store_reviews_total:0
}

const sellerSlice = createSlice({
    name:"seller",
    initialState,
    reducers:{
       
        setDashboardTotals:(state,action)=>{
            state.stores_total = action.payload.stores_total;
            state.store_products_total = action.payload.products_total
        },

        setStoreTotals:(state,action)=>{
            state.store_products_total = action.payload.products_total;
            state.store_reviews_total = action.payload.reviews_total
        }
    }
});

export const {setDashboardTotals,setStoreTotals} = sellerSlice.actions;
export default sellerSlice.reducer