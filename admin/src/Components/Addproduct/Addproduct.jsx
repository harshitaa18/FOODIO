import React, { useState } from 'react'
import './Addproduct.css';
import up from '../../Assets/up.jpg';

const Addproduct = () => {

  const [image,setImage] = useState(false);
  const[productdetails,setproductdetails] = useState({
    name: "",
    image: "",
    category: "snacks",
    price: "",
  })

  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) =>{
    setproductdetails({...productdetails,[e.target.name]:e.target.value});
  }

  const Add_product = async()=>{
    console.log(productdetails);
    let responseData;
    let product = productdetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")})
    }
  }

  return (
    <div className='addproduct'>
      <div className="addproduct-item">
        <p>Product Name</p>
        <input value={productdetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here'/>
      </div>
      <div className="addproduct-item">
        <p>Price</p>
        <input value={productdetails.price} onChange={changeHandler} type="Number" name='price' placeholder='Type Here'/>
      </div>
      <div className="addproduct-item">
        <p>Category</p>
        <select value={productdetails.category} onChange={changeHandler} name='category' className='selector'>
          <option value="dinner">Dinner</option>
          <option value="lunch">Lunch</option>
          <option value="dessert">Dessert</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>
      <div className="addproduct-item">
        <p>Upload Photo</p>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):up} className='upload_file' alt="" />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
      </div>
      <br />
      <button onClick={Add_product} className='add-butn' >Add Product</button>
    </div>
  )
}

export default Addproduct