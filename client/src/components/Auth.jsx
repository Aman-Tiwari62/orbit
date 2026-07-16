import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/orbitLogo.png'

function Auth() {
  return (
    <div className="min-h-screen bg-slate-200  px-4 py-8">
        <div className="flex items-center">
            <img src={logo} alt="Orbit logo" className="h-40 w-40 object-contain" />
            <h1 className="font-['Plus_Jakarta_Sans'] text-5xl font-extrabold tracking-[-0.04em] text-[#0B1224]">
                Orb<span className="text-[#36A3FF]">i</span>t
            </h1>
        </div>

        <Outlet />

    </div>
  )
}

export default Auth
