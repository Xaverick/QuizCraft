import { useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from "react-router";
import Home from './pages/Home'
import SignInForm from './pages/login';
import PrivateRoutes from './utils/PrivateRoutes';


function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />} >
           <Route path='/' element={<Home />}/>
        </Route>
        <Route path='/login' element={<SignInForm />}/>
      </Routes>
  
    </>
  )
}

export default App
