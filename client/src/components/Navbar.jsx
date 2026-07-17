import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/orbitLogo.png'
import homeIcon from '../assets/home.svg'
import postIcon from '../assets/post.svg'
import profileIcon from '../assets/profile.svg'
import settingsIcon from '../assets/settings.svg'
import logoutIcon from '../assets/logout.svg'
import { useDispatch } from 'react-redux'
import { setLoggingOut, clearUser } from '../features/auth/authSlice'

const baseURL = import.meta.env.VITE_BASE_URL;

function Navbar() {
  const dispatch = useDispatch();

  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsOpen && settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [settingsOpen])

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors duration-200 ${
      isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`

    const handleLogout = async()=>{
        dispatch(setLoggingOut(true));
        try{
          const response = await fetch(`${baseURL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
          }); 

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Error loggin out');
            alert("Error loggin out!");
          }
        
          // 3. Clear user data (this resets logginOut back to false automatically)
          dispatch(clearUser()); 
        
          // 4. Send them back to the login screen
          navigate('/login');

      } catch(error){
        console.error("Logout failed", error);
        dispatch(setLoggingOut(false));
      }
    }

  return (
    <aside className='w-60 min-h-screen bg-[#111827] text-slate-50 p-6 box-border flex flex-col'>
      <div className='flex items-center mb-7'>
        <img src={logo} alt='Orbit logo' className='w-20 h-20 object-contain' />
        <h1 className='m-0 text-2xl font-extrabold'>
          Orb<span className='text-[#36A3FF]'>i</span>t
        </h1>
      </div>

      <nav className='flex flex-col gap-2 flex-1'>
        <NavLink to='/' end className={navLinkClass}>
          <img src={homeIcon} alt='Home' className='w-5 h-5' />
          <span className='text-sm font-semibold'>Home</span>
        </NavLink>
        <NavLink to='/post' className={navLinkClass}>
          <img src={postIcon} alt='Post' className='w-5 h-5' />
          <span className='text-sm font-semibold'>Post</span>
        </NavLink>
        <NavLink to='/profile' className={navLinkClass}>
          <img src={profileIcon} alt='Profile' className='w-5 h-5' />
          <span className='text-sm font-semibold'>Profile</span>
        </NavLink>
      </nav>

      <div ref={settingsRef} className='relative mt-6'>
        <button
          onClick={() => setSettingsOpen((prev) => !prev)}
          className='w-full flex items-center gap-3 rounded-2xl bg-slate-800 px-4 py-3 text-slate-100 transition hover:bg-slate-700'
        >
          <img src={settingsIcon} alt='Settings' className='w-5 h-5' />
          <span className='font-semibold text-slate-100'>Settings</span>
        </button>

        {settingsOpen && (
          <div className='absolute bottom-16 left-0 w-full rounded-[14px] bg-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.35)] py-2 z-10'>
            <button
              type='button'
              onClick={handleLogout}
              className='w-full text-left px-4 py-3 text-slate-100 hover:bg-slate-700'
            >
              <div className='flex items-center gap-2'>
                <img src={logoutIcon} alt='logout' className='w-5 h-5' />
                <span className='text-sm'>Logout</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Navbar
