import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/SideBar/Sidebar'
import Navbar from '../../Component/Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import UseFetch from "../../Usefetch/Usefetch"
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const ProductById = () => {
    const location =useLocation()
    console.log(location);
    const id = location.pathname.split("/")[2]
    console.log('id', id);

    const { data, reFetchData} = UseFetch(`https://canteen-api-nodej.onrender.com/product/${id}`);
   console.log(data);
    

    const navigate = useNavigate();
    useEffect(() => {
        if (data) {
          setItem({
            title: data.title || '',
            desc: data.desc || '',
            category: data.category || '',
            quantity: data.quantity || '',
            price: data.price || '',
            rating: data.rating || '',
           
          });
        }
      }, [data]);

    
      const [item, setItem] = useState({
        title: '',
        desc: '',
        category: '',
        quantity: '',
        price: '',
        rating: '',
        
      });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setItem({
        ...item,
        [name]: value,
      });
      console.log(item);
    };
    console.log(item);
  
    const handleEdit= async (e) => {
      e.preventDefault();
  
      try {
        const res = await axios.put(`https://canteen-api-nodej.onrender.com/product/${id}`, item);
        console.log(res);
       
  
        // Clear the input fields immediately
        setTimeout(()=>{
          toast('Item updated successfully!');
          setItem({
            title: '',
            desc: '',
            category: '',
            quantity: '',
            price: '',
            rating: '',
            photo: '',
          });
      }, 1500)
       
  
        // Optionally, navigate to another page after item creation
        // navigate('/allProduct');
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className='addSidebar'>
        <Sidebar />
        <div className='addNavbar'>
          <Navbar />
          <h3 className='productTitle'>Update Product</h3>
          <div className='addContentBox'>
            <div className='inputName'>
              <h4>Name</h4>
              <input
                className='textField'
                type='text'
                name='title'
                value={item.title}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>Description</h4>
              <input
                className='textField'
                type='text'
                name='desc'
                value={item.desc}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>Quantity</h4>
              <input
                className='textField'
                type='text'
                name='quantity'
                value={item.quantity}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>Category</h4>
              <input
                className='textField'
                type='text'
                name='category'
                value={item.category}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>Price</h4>
              <input
                className='textField'
                type='text'
                name='price'
                value={item.price}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>Rating</h4>
              <input
                className='textField'
                type='text'
                name='rating'
                value={item.rating}
                onChange={handleChange}
              />
            </div>
            
          </div>
          <button className='addButton' onClick={handleEdit}>
           Update Item
          </button>
          <ToastContainer />
          </div>
          </div>
  )
}

export default ProductById