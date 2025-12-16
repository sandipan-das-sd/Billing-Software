import React from 'react'
import Auth from './pages/Auth'
import Register from './pages/Register'
import Home from './pages/Home'
import  useAuth from './context/authContext.jsx'
import {Navigate, BrowserRouter, Routes, Route} from 'react-router-dom'

export default function App() {
  const {token, loading}=useAuth();
  
  if(loading) {
    return <div>Loading...</div>;
  }

 return (
<BrowserRouter>
<Routes>
<Route path='/' element={token ? <Navigate to='/home'/> : <Navigate to='/login'/>}/>
<Route path='/home' element={token ? <Home/> : <Navigate to='/login'/>}/>
<Route path='/login' element={!token ? <Auth/> : <Navigate to='/home'/>}/>
<Route path='/register' element={!token ? <Register/> : <Navigate to='/home'/>}/>
</Routes>
</BrowserRouter>
 )
}
