import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setPosts} from '../features/posts/myPostsSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

function MyPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.myPosts.posts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if(posts.length>0) return;
    console.log("my posts fetched...")
    async function fetchPosts() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${baseURL}/post/me`, {
          credentials: 'include'
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch posts.');
        }

        dispatch(setPosts(data.posts || []));
      } catch (err) {
        setError(err.message || 'Failed to load posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [dispatch]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      {loading && <div className="mb-4 text-sm text-slate-500">Loading posts...</div>}
      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts.length === 0 && !loading ? (
          <div className="col-span-full rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            You do not have any posts yet.
          </div>
        ) : (
          posts.map((post) => (
            <article key={post._id || post.id} className="group relative overflow-hidden rounded-lg bg-slate-100 shadow-sm">
              <img
                src={post.image || ''}
                alt={post.content || 'Post image'}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex flex-col justify-between opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex justify-end p-2">
                  <div className="rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recently added'}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 bg-linear-to-t from-black/50 to-transparent px-3 py-2">
                  <div className="max-w-[70%] text-sm font-medium text-white line-clamp-2">
                    {post.content || 'No caption'}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-rose-400">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.54 0 3.04.99 3.57 2.36h.87C14.46 4.99 15.96 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <span>{post.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M21 6h-2v9H7v2a1 1 0 001 1h9l4 4V7a1 1 0 00-1-1z" />
                        <path d="M17 2H3a1 1 0 00-1 1v12l4-4h11a1 1 0 001-1V3a1 1 0 00-1-1z" />
                      </svg>
                      <span>{post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default MyPosts
// import React from 'react'

// function MyPosts() {
//   return (
//     <div>
//       myPosts
//     </div>
//   )
// }

// export default MyPosts
