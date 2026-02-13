import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "../slices/userSlice";
import contentSliceReducer from "../slices/contentSlice";
import storeSliceReducer from "../slices/StoreSlice";
import productSliceReducer from "../slices/productSlice";
import formSliceReducer from "../slices/formSlice";
import sellerSliceReducer from "../slices/sellerSlice"

export const store = configureStore({
    reducer:{
        user:userSliceReducer,
        content:contentSliceReducer,
        stores:storeSliceReducer,
        products:productSliceReducer,
        forms:formSliceReducer,
        seller:sellerSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch