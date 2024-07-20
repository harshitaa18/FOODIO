import React, { useEffect, useState } from 'react'
import cross from '../../Assets/cross_icon.png';
import './Listproduct.css';

const Listproduct = () => {

  const[allproducts,setallproducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('https://foodio-0x93.onrender.com/allproducts')
    .then((resp)=>resp.json())
    .then((data)=>{setallproducts(data)});
  }

  useEffect(()=>{
      fetchInfo();
  })

  const remove_product = async (id)=>{
    await fetch('https://foodio-0x93.onrender.com/removeproduct',{
      method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({id:id}),
      })
      await fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="format">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listall">
        <hr />
        {allproducts.map((product,index)=>{
          return <div key={index} className="list-format format">
              <img src={product.image} alt="" className="list-icon" />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <img className='list-icon-remove' onClick={()=>{remove_product(product.id)}} src={cross} alt="" />
          </div>
        })}
      </div>
    </div>
  )
}

export default Listproduct