import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        <Navbar />
      </div>

      <main
        style={{
          flex: 1,
          padding: '24px',
          background: '#f3f4f6',
          overflowY: 'auto',
          height: '100vh'
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default Home
