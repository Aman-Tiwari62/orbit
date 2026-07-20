import React, { useState } from 'react'
import defaultImage from '../assets/dummyProfile.jpg'
import likedIcon from '../assets/Liked.svg'
import notLikedIcon from '../assets/notLiked.svg'

function Post({ post }) {
  const { author = {}, content, image, likes = [], createdAt } = post || {}
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes.length)
  const authorName = author.name || 'Unknown User'
  const authorUsername = author.username ? `@${author.username}` : '@unknown'
  const authorPic = author.profilePic || defaultImage

  function toggleLike() {
    setLiked((prev) => !prev)
    setLikesCount((count) => count + (liked ? -1 : 1))
  }

  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        padding: '16px',
        maxWidth: '640px',
        width: '100%',
        margin: '0 auto'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <img
          src={authorPic}
          alt={`${authorName} profile`}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #e5e7eb'
          }}
        />
        <div>
          <div style={{ fontWeight: 700, color: '#111827' }}>{authorName}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>{authorUsername}</div>
        </div>
      </div>

      {image && (
        <img
          src={image}
          alt='Post content'
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: '16px',
            display: 'block',
            marginBottom: '16px'
          }}
        />
      )}

      {content && (
        <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>
          {content}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '12px',
          borderTop: '1px solid #e5e7eb'
        }}
      >
        <button
          onClick={toggleLike}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          <img
            src={liked ? likedIcon : notLikedIcon}
            alt={liked ? 'Liked' : 'Not liked'}
            style={{ width: '24px', height: '24px' }}
          />
          <span style={{ color: liked ? '#dc2626' : '#6b7280', fontWeight: 600 }}>
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
        </button>
        {createdAt && (
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            {new Date(createdAt).toLocaleString()}
          </span>
        )}
      </div>
    </article>
  )
}

export default Post
