import React, { useState } from 'react'
import './Header.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';

export const Header = () => {

  const[list,setList] = useState("home");
  return (
    <div className='header'>
        <div className='logo'>
            <img src={logo} alt="" />
            <p>Foodio</p>
        </div>
        <ul className='header-menu'>
                <li onClick={()=>{setList("home")}} className={list==="home"?"active":""}><Link to='/' style={{ textDecoration: 'none' }} >Home</Link></li>
                <li onClick={()=>{setList("menu")}} className={list==="menu"?"active":""} ><Link to='/menu' style={{ textDecoration: 'none' }}>Menu</Link></li>
                <li onClick={()=>{setList("aboutus")}} className={list==="aboutus"?"active":""} ><Link to='/aboutus' style={{ textDecoration: 'none' }} >About</Link></li>
                <li onClick={()=>{setList("reservation")}} className={list==="reservation"?"active":""} ><Link to='/reservation' style={{ textDecoration: 'none' }} >Reservation</Link></li>
                <li onClick={()=>{setList("contact")}} className={list==="contact"?"active":""} ><Link to='/contact' style={{ textDecoration: 'none' }} >Contact us</Link></li>
        </ul>
        <div className="side-buttons">
        <Link to='/cart'><button className='cart'><i class="fa-solid fa-cart-shopping"></i></button></Link>
        {localStorage.getItem('auth-token')?<button className='button' onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Log Out</button>:
        <Link to='/login'><button className='button'>Log in</button></Link>
        }
        </div>
    </div>
  )
}

export default Header;
