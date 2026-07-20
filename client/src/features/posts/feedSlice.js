import { createSlice } from "@reduxjs/toolkit";
console.log("post slice...")

const initialState = {
    posts:[],
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
    }  
})

export const {
    setPosts,
    setLoading,
    addPostFeed
} = feedSlice.actions;

export default feedSlice.reducer;