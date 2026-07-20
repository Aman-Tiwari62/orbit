import { createSlice } from "@reduxjs/toolkit";
console.log("mypost slice...")

const initialState = {
    posts:[],
    loading:false,
    error:null
}

const myPostsSlice = createSlice({
    name:"myPosts",
    initialState,
    reducers:{
        setPosts : (state, action)=>{
            state.posts = action.payload;
            state.loading = false;
        },
        setLoading : (state,action)=>{
            state.loading=action.payload;
        }
    }  
})

export const {
    setPosts,
    setLoading
} = myPostsSlice.actions;

export default myPostsSlice.reducer;