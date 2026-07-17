import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Home() {
  const loggingOut = useSelector((state) => state.auth?.logginOut ?? false)

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm transition-all duration-200 ${
          loggingOut ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!loggingOut}
      >
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-2xl">
          <p className="text-base font-semibold text-slate-700">Logging out...</p>
        </div>
      </div>

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
