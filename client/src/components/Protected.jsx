import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Protected() {
    console.log('protected....')
    const user = useSelector(state=>state.auth.user);
    if(!user) return <Navigate to="/auth" replace />;
    return (
      <Outlet />
    )
}

export default Protected
