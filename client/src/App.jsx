import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Profile from './components/Profile';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Login from './components/Login';
import { useAuthHook } from './hooks/authHooks';
import Auth from './components/Auth';
import Signup from './components/Signup';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';

function App() {
  useAuthHook();
  const user = useSelector(state=>state.auth.user);
  console.log('App...')
  console.log(user.username);
  return (
    <Routes>
      <Route path='/' element={<Home />} >
          <Route index element={<Feed />} />
          <Route path='profile' element={<Profile />} />
          <Route path='post' element={<CreatePost />} />
      </Route>
      <Route path='/auth' element={<Auth />} >
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App

