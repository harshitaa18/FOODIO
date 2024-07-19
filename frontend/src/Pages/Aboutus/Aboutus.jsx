import React from 'react'
import './Aboutus.css'
import pic1 from '../../Components/Assets/pic1.jpg'
import pic2 from '../../Components/Assets/pic2.jpeg'
import pic3 from '../../Components/Assets/pic3.jpg'
import Header from "../../Components/Header/Header";
import { Link } from 'react-router-dom';

const Aboutus = () => {
  return (
    <>
    <Header/>
    <div className='about'>
      <div className="topp">
        <div className="outer-img">
          <div className="inner-img">
            <img src={pic1} alt="" className='circular-image' />
          </div>
        </div>
        <div className="top1">
        <h1>About Our <span>Restaurant</span></h1>
        <p>This dish is full of flavor and nutrition! Quinoa is a complete protein, providing all the essential amino acids your body needs, and is also a good source of fiber.</p>
        <button className='red'><Link to="/menu" className='link-style'>Order now</Link></button>
        </div>
      </div>
      <div className="middle">
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        <div className="outer-img">
          <div className="inner-img">
          <img src={pic2} alt="" className='circular-image' />
          </div>
        </div>
      </div>
      <div className="bottom">
        <img src={pic3} alt="" />
        <div className="bottom1">
        <h1><span>Owner</span> & Executive Chef</h1>
        <h3>Ismail Marzuki</h3>
        <p>This dish is full of flavor and nutrition! Quinoa is a complete protein, providing all the essential amino acids your body needs, and is also a good source of fiber.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Aboutus