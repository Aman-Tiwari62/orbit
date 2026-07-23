import { createSlice } from "@reduxjs/toolkit";
console.log("post slice...")

const initialState = {
    posts:[],
    page:1,
    loading:false,
    error:null
}

const feedSlice = createSlice({
    name:"feed",
    initialState,
    reducers:{
        setPosts : (state, action)=>{
            state.posts = action.payload;
            state.loading = false;
        },
        setLoading : (state,action)=>{
            state.loading=action.payload;
        },
        addPostFeed: (state, action) => {
            state.posts.unshift(action.payload);
        },
        addPostsToFeed: (state, action) => {
            state.posts.push(...action.payload.posts);
            state.page = action.payload.page;
        }
    }  
})

export const {
    setPosts,
    setLoading,
    addPostFeed,
    addPostsToFeed
} = feedSlice.actions;

export default feedSlice.reducer;