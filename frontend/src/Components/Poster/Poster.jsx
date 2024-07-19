import React from 'react'
import './Poster.css'
import poster_pic from '../Assets/poster_pic.png'
import { Link } from 'react-router-dom';

const Poster = () => {
  return (
    <div className='poster'>
        <div className="poster-left">
            <h1>Best Restaurant In <span>Town.</span></h1>
            <p>We provide best food in town, we provide home delivery and dine in services.</p>
            <div className="keyy">
            <button className='batty1'><Link to="/menu" className='link-style'>Order now</Link></button>
            <button className='batty2'><Link to="/reservation" className='link-style'>Reservation</Link></button>
            </div>
        </div>
        <div className="poster-right">
            <img src={poster_pic} alt="" />
        </div>
    </div>
  )
}

export default Poster