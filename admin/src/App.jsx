import { useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from "react-router";
import Home from './pages/Home'
import SignInForm from './pages/login';

function App() {


  return (
    <>
      <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/login' element={<SignInForm />}/>
  </Routes>
  
    </>
  )
}

export default App
