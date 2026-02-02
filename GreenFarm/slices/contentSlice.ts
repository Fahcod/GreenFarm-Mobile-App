import { createSlice } from "@reduxjs/toolkit";
import type {Content} from "@/types/types"

interface ContentState {
    latest_videos:Content[],
    latest_articles:Content[]
}

const initialState:ContentState = {
    latest_videos:[],
    latest_articles:[]
}

const contentSlice = createSlice({
    name:"content",
    initialState,
    reducers:{

        setLatestVideos:(state,action)=>{
            state.latest_videos = action.payload
        },

        setLatestArticles:(state,action)=>{
            state.latest_articles = action.payload
        },

    }
});

export const {setLatestArticles
    ,setLatestVideos} = contentSlice.actions;
export default contentSlice.reducer