import React, { useState } from 'react'
import defaultImage from '../assets/dummyProfile.jpg'
import likedIcon from '../assets/Liked.svg'
import notLikedIcon from '../assets/notLiked.svg'

function Post({ image = defaultImage, text = 'This is a dummy post caption.' }) {
  const [liked, setLiked] = useState(false)

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        padding: '16px',
        maxWidth: '560px',
        margin: '0 auto 20px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <img
          src={defaultImage}
          alt='User profile'
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #e5e7eb'
          }}
        />
        <div>
          <div style={{ fontWeight: 700, color: '#111827' }}>Aman Tiwari</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>@orbit_user</div>
        </div>
      </div>

      <img
        src={image}
        alt='Post content'
        style={{
          width: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
          display: 'block'
        }}
      />

      {text && (
        <p style={{ margin: '12px 0 0', fontSize: '15px', color: '#374151', lineHeight: 1.5 }}>
          {text}
        </p>
      )}

      <div
        style={{
          marginTop: '14px',
          paddingTop: '12px',
          borderTop: '1px solid #e5e7eb'
        }}
      >
        <button
          onClick={() => setLiked(!liked)}
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
            {liked ? 'Liked' : 'Like'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Post
