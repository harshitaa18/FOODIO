import React, { useState } from 'react';
import './Addproduct.css';
import up from '../../Assets/up.jpg';

const Addproduct = () => {
  const [image, setImage] = useState(null); // Set initial state to null
  const [productDetails, setProductDetails] = useState({
    name: "",
    image_filename: "", // Changed to image_filename
    category: "snacks",
    price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);

    // Check if an image file is selected
    if (!image) {
      alert("Please upload an image");
      return;
    }

    // Upload the image and get the filename
    let responseData;
    const formData = new FormData();
    formData.append('product', image);

    await fetch('https://foodio-0x93.onrender.com/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => { responseData = data; });

    // Check if the image upload was successful
    if (responseData.success) {
      // Update productDetails with the image filename
      const product = {
        ...productDetails,
        image_filename: responseData.image_filename, // Use image_filename from the response
      };

      // Add the product with image filename
      await fetch('https://foodio-0x93.onrender.com/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    } else {
      alert("Image upload failed");
    }
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-item">
        <p>Product Name</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here'/>
      </div>
      <div className="addproduct-item">
        <p>Price</p>
        <input value={productDetails.price} onChange={changeHandler} type="Number" name='price' placeholder='Type Here'/>
      </div>
      <div className="addproduct-item">
        <p>Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='selector'>
          <option value="dinner">Dinner</option>
          <option value="lunch">Lunch</option>
          <option value="dessert">Dessert</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>
      <div className="addproduct-item">
        <p>Upload Photo</p>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : up} className='upload_file' alt="" />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
      </div>
      <br />
      <button onClick={addProduct} className='add-butn'>Add Product</button>
    </div>
  );
};

export default Addproduct;
