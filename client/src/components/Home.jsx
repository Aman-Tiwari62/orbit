import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="sticky top-0 h-screen shrink-0">
        <Navbar />
      </div>

      <main className="h-screen flex-1 overflow-y-auto bg-gray-100 px-16 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Home
