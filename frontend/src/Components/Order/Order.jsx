import React from 'react'
import './Order.css'
import { Link } from 'react-router-dom';

const Order = () => {
  return (
    <div className='order'>
        <h1>Hungry? We are open now..</h1>
        <button className='red'><Link to="/menu" className='link-style'>Order now</Link></button>
        <button className='white'><Link to="/reservation" className='link-style' >Reservation</Link></button>
    </div>
  )
}

export default Order