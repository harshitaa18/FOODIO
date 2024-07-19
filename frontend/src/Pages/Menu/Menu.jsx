import React from 'react'
import './Menu.css'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import Header from "../../Components/Header/Header";

const Menu = () => {
  return (
    <div className='menu'>
        <Header/>
        <FoodDisplay/>
    </div>
  )
}

export default Menu