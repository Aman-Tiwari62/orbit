import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function Public() {
    console.log('public...')
    const user = useSelector(state=>state.auth.user);
    if(user) return <Navigate to="/" replace />;
  return (
    <Outlet />
  )
}

export default Public
