import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Route,Routes } from 'react-router-dom';
import Addproduct from '../Components/Addproduct/Addproduct';
import Listproduct from '../Components/Listproduct/Listproduct';
import './Admin.css';
import Addreservation from '../Components/Addreservation/Addreservation';

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <div className='content'>
          <Routes>
            <Route path='/addproduct' element={<Addproduct/>}/>
            <Route path='/allproducts' element={<Listproduct/>}/>
            <Route path='/reservation' element={<Addreservation/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default Admin