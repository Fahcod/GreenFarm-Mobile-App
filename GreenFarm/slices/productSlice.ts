import { Product } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface ProductsState {
   suggested_products:Product[],
   product_data:Product | null,
   store_products:Product[],
   category_products:Product[],
   all_products:Product[]
};

const initialState:ProductsState = {
   suggested_products:[],
   product_data:null,
   store_products:[],
   category_products:[],
   all_products:[]
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        
        setSuggestedProducts:(state,action)=>{
            state.suggested_products = action.payload
        },

        setProductData:(state,action)=>{
            state.product_data = action.payload
        },

        setStoreProducts:(state,action)=>{
            state.store_products = action.payload
        },

        setCategoryProducts:(state,action)=>{
            state.category_products = action.payload
        },
        setAllProducts:(state,action)=>{
            state.all_products = action.payload
        }
    }
});

export const {
    setSuggestedProducts,setProductData,
    setStoreProducts,setCategoryProducts,
    setAllProducts} = productSlice.actions;
export default productSlice.reducer