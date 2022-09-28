import React from 'react'
import { BrowserRouter, Routes, Route,NavLink, Outlet } from 'react-router-dom'
import LogPage from '../loginpage/LogPage'
import Signup from '../signup/Signup'
import './cssfiles/cssfile.css'

export default function Dotchatcomp() {

  return (
    <>
      <nav className='nav-section'>
        <div className='left-division'>
        </div>
        <div className='right-division'>
          <ul>
            <li><NavLink to="/login" className={'navLink'}>LOG IN</NavLink></li>
            <li><NavLink to="/signup" className={'navLink'}>SIGN UP</NavLink></li>
            <Outlet/>
          </ul>
        </div>
      </nav>

      {/* Included Routes Here */}
        <Routes>
          <Route path="/" element={<LogPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </>
  )
}
