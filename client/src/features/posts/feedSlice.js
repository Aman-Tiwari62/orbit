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
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;

            state.posts = state.posts.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            );
        },
        toggleLikeOptimistic: (state, action) => {
            const { postId, userId } = action.payload;

            const post = state.posts.find(p => p._id === postId);
            if (!post) return;

            const index = post.likes.indexOf(userId);

            if (index === -1) {
                post.likes.push(userId);
            } else {
               post.likes.splice(index, 1);
            }
        }
        
    }
})

export const {
    setPosts,
    setLoading,
    addPostFeed,
    addPostsToFeed,
    updatePost,
    toggleLikeOptimistic
} = feedSlice.actions;

export default feedSlice.reducer;