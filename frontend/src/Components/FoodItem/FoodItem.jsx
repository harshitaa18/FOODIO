import React, { useContext } from 'react'
import './FoodItem.css'
import rating_starts from '../Assets/rating_starts.png'
import { ShopContext } from '../../Context/ShopContext'

const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems,removeFromCart,add} = useContext(ShopContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={image} alt="" />
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <div className="value">
              <p className="food-item-price">${price}</p>
              {!cartItems[id] || cartItems[id] === 0 
                  ? (<button className='add' onClick={()=>add(id)}>Add</button>)
                  : (<button className="remove" onClick={()=>removeFromCart(id)}>Remove</button>)
              }
            </div>
        </div>
    </div>
  )
}

export default FoodItem