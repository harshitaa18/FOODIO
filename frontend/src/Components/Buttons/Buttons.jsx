import React, { useState } from 'react'
import './Buttons.css'

function Buttons({menuItems, filterItems}) {

  const [activeCategory, setActiveCategory] = useState('All');

  const handleClick = (category) => {
    setActiveCategory(category);
    filterItems(category);
  };
  
  return (
    <div className='category'>
      <button onClick={() => handleClick('All')} className={activeCategory === 'All' ? 'active' : ''}>
        All
      </button>
      {
      menuItems.map((val, index) => (
        <button key={index} className={activeCategory === val ? 'active' : ''} onClick={() => handleClick(val)}>
          {val}
        </button>
      ))
      }
    </div>
  )
}

export default Buttons