import React from 'react'
import './Navbar.css';
import logo from '../../Assets/logo.png'
import profile from '../../Assets/profile.jpg';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='title'>
        <img src={logo} alt="" className='nav-logo'/>
        <h1>Foodio</h1>
        </div>
        <img src={profile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar