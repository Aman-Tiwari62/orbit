import React, { useState, useEffect } from 'react'
import Post from './Post'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setPosts} from '../features/posts/feedSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

function Feed() {
  console.log('feed....')
  const dispatch = useDispatch();
  const posts = useSelector(state=>state.feed.posts);
  // console.log("posts: "+posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    </div>
  );
}

export default Feed
