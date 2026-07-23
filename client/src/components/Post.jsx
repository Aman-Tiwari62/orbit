import React, { useState } from 'react'
import defaultImage from '../assets/dummyProfile.jpg'
import likedIcon from '../assets/Liked.svg'
import notLikedIcon from '../assets/notLiked.svg'
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, toggleLikeOptimistic } from '../features/posts/feedSlice';

const baseURL = import.meta.env.VITE_BASE_URL;

function Post({ post }) {
  const dispatch = useDispatch();
  const { author = {}, content, image, likes = [], createdAt } = post || {}
  const user = useSelector((state) => state.auth.user);
  const liked = likes.includes(user.id);
  const likesCount = likes.length;

  const authorName = author.name || 'Unknown User'
  const authorUsername = author.username ? `@${author.username}` : '@unknown'
  const authorPic = author.profilePic || defaultImage

  const handleClick = async()=>{
    dispatch(toggleLikeOptimistic({ postId: post._id, userId: user.id }));
    try{
      const response = await fetch(`${baseURL}/post/like/${post._id}`, {
        method:'PUT',
        credentials:'include'
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to like the post.');
      }
      dispatch(updatePost(data.post)); 

    } catch(err){
      console.error('Error liking post:', err);
      dispatch(toggleLikeOptimistic({ postId: post._id, userId: user.id })); // Revert the like state if there's an error
    }
  }

  return (
    <article className="mx-auto w-full max-w-[640px] rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div className="mb-4 flex items-center gap-3">
        <img
          src={authorPic}
          alt={`${authorName} profile`}
          className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
        />

        <div>
          <div className="font-bold text-gray-900">{authorName}</div>
          <div className="text-xs text-gray-500">{authorUsername}</div>
        </div>
      </div>

      {image && (
        <img
          src={image}
          alt="Post content"
          className="mb-4 block w-full rounded-2xl object-cover"
        />
      )}

      {content && (
        <p className="mb-4 text-[15px] leading-[1.7] text-gray-700">
          {content}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <button
          onClick={handleClick}
          className="flex cursor-pointer items-center gap-2 bg-transparent py-1"
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          <img
            src={liked ? likedIcon : notLikedIcon}
            alt={liked ? 'Liked' : 'Not liked'}
            className="h-6 w-6"
          />

          <span
            className={`font-semibold ${
              liked ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
        </button>

        {createdAt && (
          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </span>
        )}
      </div>
    </article>
  )
}

export default Post
