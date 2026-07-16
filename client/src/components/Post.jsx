import React, { useState } from 'react'
import defaultImage from '../assets/orbitLogo.png'
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
      <img
        src={image}
        alt='Post content'
        style={{
          width: '100%',
        //   height: '320px',
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

      <button
        onClick={() => setLiked(!liked)}
        style={{
          marginTop: '12px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
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
        {/* <span style={{ color: liked ? '#dc2626' : '#6b7280', fontWeight: 600 }}>
          {liked ? 'Liked' : 'Like'}
        </span> */}
      </button>
    </div>
  )
}

export default Post
