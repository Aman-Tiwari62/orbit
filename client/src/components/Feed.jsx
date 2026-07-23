import React, { useState, useEffect } from 'react'
import Post from './Post'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setPosts, addPostsToFeed} from '../features/posts/feedSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

function Feed() {
  console.log('feed....')
  const dispatch = useDispatch();
  const posts = useSelector(state=>state.feed.posts);
  const page = useSelector(state=>state.feed.page);
  // console.log("posts: "+posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const [pageLoadingError, setPageLoadingError] = useState('');

  const fetchMorePosts = async()=>{
    if (pageLoading) return; // if user clicks the fetch more posts quickly many times.

    setPageLoading(true);
    setPageLoadingError("");
    try{
      const response = await fetch(`${baseURL}/post/feed?page=${page+1}`, {
        credentials:'include'
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts.');
      }
      if(data.posts.length===0){
        setPageLoadingError("No more posts.")
        return;
      }
      dispatch(addPostsToFeed({
        posts:data.posts,
        page:page+1
      }));
      console.log(page)
    } catch(err){
      setPageLoadingError(err.message || 'Failed to load posts.');
    } finally{
      setPageLoading(false)
    }
  }

  useEffect(() => {
    if(posts.length>0) return;
    console.log('feed fetched...')
    async function fetchPosts() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${baseURL}/post/feed`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch posts.');
        }
        dispatch(setPosts(data.posts || []));
        // console.log(data.posts);
      } catch (err) {
        setError(err.message || 'Failed to load posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [dispatch]);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <div style={{ display: 'grid', gap: '20px', padding: '20px' }}>
      {posts.length === 0 ? (
        <div>No posts available.</div>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
      <div className='flex justify-center'>
      <button
      disabled={pageLoading}
      onClick={fetchMorePosts}
        className="px-6 py-3 bg-gray-300 text-black font-medium rounded-lg shadow-md hover:bg-gray-400 hover:cursor-pointer active:scale-95 transition-all duration-200" 
      >
        {pageLoading? "loading more posts for you..":"fetch more posts"}
      </button>
      </div>
      <p className='text-center'>{pageLoadingError}</p>
    </div>
  );
}

export default Feed
