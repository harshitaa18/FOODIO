import React from 'react';
import './Chef.css';
import chef1 from '../Assets/Chef1.avif';
import chef2 from '../Assets/Chef2.jpg';
import chef3 from '../Assets/Chef3.png';

const Chef = () => {
  return (
    <div className='chef'>
        <h1>Our Popular Chef</h1>
        <div className="chef_pic">
            <div className="chef_container">
                <img src={chef1} alt="Head Chef (Male)" />
                <h2>Head Chef (Male)</h2>
                <div className="hover_text">Hello, I am the Head Chef!</div>
            </div>
            <div className="chef_container">
                <img src={chef2} alt="Head Chef (Female)" />
                <h2>Head Chef (Female)</h2>
                <div className="hover_text">Welcome to our kitchen!</div>
            </div>
            <div className="chef_container">
                <img src={chef3} alt="Head Chef (Male)" />
                <h2>Head Chef (Male)</h2>
                <div className="hover_text">Enjoy our delicious meals!</div>
            </div>
        </div>
    </div>
  );
}

export default Chef;
