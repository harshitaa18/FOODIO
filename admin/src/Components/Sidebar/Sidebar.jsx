import React from 'react'
import './Sidebar.css';
import {Link} from 'react-router-dom';
import cart from '../../Assets/cart.png';
import list from '../../Assets/list.jpg';
import rr from '../../Assets/reserve.png';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={cart} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/allproducts'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={list} alt="" />
                <p>List Product</p>
            </div>
        </Link>
        <Link to={'/reservation'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={rr} alt="" />
                <p>Reservations</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar