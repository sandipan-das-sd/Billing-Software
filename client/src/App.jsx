import React from 'react'
import Auth from './pages/Auth'
import Register from './pages/Register'
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


<Route path='/' element={!token ?<Auth/> :<Home/>}/>
<Route path='/login' element={!token ?<Auth/> :<Home/>}/>
<Route path='/register' element={!token ?<Register/> :<Navigate to='/'/>}/>
</Routes>
</BrowserRouter>
 )
}
