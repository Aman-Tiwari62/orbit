import React from 'react'
import dummyProfile from '../assets/dummyProfile.jpg'
import editIcon from '../assets/edit.svg'
import { NavLink, Outlet } from 'react-router-dom'


function Profile() {
  const user = {
    name: 'Aman Tiwari',
    username: 'aman_tiwari',
    email: 'aman@example.com',
    profileImage: dummyProfile,
    bio: 'Creative developer building thoughtful experiences with modern web tools.',
    followers: 128,
    following: 94,
  }

  return (
    <>
    <div className="w-full rounded-3xl border border-fuchsia-100 bg-gradient-to-br from-slate-900 via-slate-800 to-fuchsia-700 p-7 shadow-[0_20px_50px_rgba(15,23,42,0.22)]">
      <div className="relative flex items-center text-center">
        <button
          type="button"
          className="absolute right-0 top-0 rounded-full border border-slate-300 bg-slate-100 p-2 text-slate-700 shadow-md transition hover:bg-slate-200 hover:text-slate-900"
          aria-label="Edit profile"
        >
          <img src={editIcon} alt="Edit" className="h-5 w-5" />
        </button>

        <div className="mb-4 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 p-1.5">
          <img
            src={user.profileImage}
            alt={user.name}
            className="block h-60 w-60 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="h-full flex-1 pl-6 text-left">
          <h2 className="mb-2 text-4xl font-semibold text-white">{user.name}</h2>
          <p className="mb-2.5 font-semibold text-cyan-300">@{user.username}</p>
          <p className="mb-4 text-sm leading-6 text-slate-200">{user.bio}</p>
          <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-left backdrop-blur-sm">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Contact
            </div>
            <div className="font-semibold text-white">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="navbarforprofile"
      className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
    >
      <div id='navbarprofile' className="flex flex-wrap items-center gap-3 text-lg font-semibold text-slate-700">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `rounded-full px-3 py-1 transition ${isActive ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="followers"
          className={({ isActive }) =>
            `rounded-full px-3 py-1 transition ${isActive ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`
          }
        >
          Followers <span className='text-blue-500'>{user.followers}</span>
        </NavLink>
        <NavLink
          to="followings"
          className={({ isActive }) =>
            `rounded-full px-3 py-1 transition ${isActive ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`
          }
        >
          Following <span className='text-blue-500'>{user.following}</span>
        </NavLink>
      </div>
    </div>
    <Outlet />
    </>
  )
}

export default Profile

