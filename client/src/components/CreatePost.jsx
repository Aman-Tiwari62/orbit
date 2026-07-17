import React, { useState } from 'react'

function CreatePost() {
  const [imagePreview, setImagePreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleUpload = (event) => {
    event.preventDefault()

    if (!imageFile) {
      alert('Please select an image before uploading.')
      return
    }

    console.log('Uploading post:', { caption, imageFile })
    alert('Post ready to upload!')
  }

  return (
    <form
      onSubmit={handleUpload}
      style={{
        maxWidth: '620px',
        margin: '24px auto',
        padding: '24px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        border: '1px solid #e5eefc'
      }}
    >
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ margin: '0 0 6px', color: '#111827', fontSize: '22px' }}>Create Post</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
          Share a photo and add a short caption.
        </p>
      </div>

      <label
        style={{
          display: 'block',
          marginBottom: '14px',
          fontWeight: 600,
          color: '#374151'
        }}
      >
        <div
          style={{
            border: '2px dashed #93c5fd',
            borderRadius: '14px',
            padding: '18px',
            textAlign: 'center',
            background: '#f8fbff',
            color: '#2563eb',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '15px', fontWeight: 700 }}>Choose Image</div>
          <div style={{ fontSize: '13px', marginTop: '4px', color: '#6b7280' }}>
            PNG, JPG, or GIF up to your preference
          </div>
        </div>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </label>

      {imagePreview && (
        <div
          style={{
            overflow: 'hidden',
            borderRadius: '16px',
            marginBottom: '14px',
            border: '1px solid #e5e7eb'
          }}
        >
          <img
            src={imagePreview}
            alt='Preview'
            style={{
              width: '100%',
              maxHeight: '320px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      )}

      <textarea
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        placeholder='Write a caption (optional)...'
        rows={4}
        style={{
          width: '100%',
          border: '1px solid #d1d5db',
          borderRadius: '12px',
          padding: '12px 14px',
          resize: 'vertical',
          marginBottom: '14px',
          boxSizing: 'border-box',
          fontSize: '14px',
          outline: 'none',
          background: '#ffffff'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type='submit'
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '999px',
            padding: '10px 18px',
            cursor: 'pointer',
            fontWeight: 700,
            boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)'
          }}
        >
          Upload Post
        </button>
      </div>
    </form>
  )
}

export default CreatePost
