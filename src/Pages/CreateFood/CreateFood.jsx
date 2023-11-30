import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar/Sidebar';
import Navbar from '../../Component/Navbar/Navbar';
import './CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateFood = () => {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    title: '',
    desc: '',
    category: '',
    price: '',
    time: '',
    image: null,

  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
      setItem({
        ...item,
        image: file,
      });
    //   console.log(item);
    // } catch (error) {
    //   console.error('Error converting image to base64:', error);
    }

  // const convertBase64=(file)=>{
  //   return new Promise((resolve, reject)=>{
  //     const fileReader= new FileReader()
  //     fileReader.readAsDataURL(file)

  //     fileReader.onload=()=>{
  //       resolve(fileReader.result)
  //     }

  //    fileReader.onerror=()=>{
  //      reject(error)
  //    }
  //      }) }

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('image', item.image)
    formData.append('title', item.title)
    formData.append('desc', item.desc)
    formData.append('category', item.category)
    
    formData.append('time', item.time)
    formData.append('price', item.price)

    try {
      const res = await axios.post('https://canteen-api-nodej.onrender.com/product', formData);
      console.log(res);

      toast('Item created successfully!');

      // Clear the input fields immediately
      setTimeout(() => {
        navigate('/allProduct')
        setItem({
          title: '',
          desc: '',
          category: '',
          quantity: '',
          price: '',
          rating: '',
          image: null,
        });
      }, 1500)


      // Optionally, navigate to another page after item creation
      // navigate('/allProduct');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='addSidebar'>
        <Sidebar />
        <div className='addNavbar'>
          <Navbar />
          <h3 className='productTitle'>Create Product</h3>
          <form onSubmit={handleClick} encType='multipart/form-data'>
         
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
              <h4>Time to get ready</h4>
              <input
                className='textField'
                type='text'
                name='time'
                value={item.time}
                onChange={handleChange}
              />
            </div>

            <div className='inputName'>
              <h4>Add Photo</h4>
              <input
                className='textField'
                type='file'
                name='image'
                accept='.jpeg, .png, .jpg'
                onChange={handleImage}

              />

            </div>
           
           
          </div>
          <button className='addButton' type='sumbit'  >
            Create Item
          </button>
          </form>
         
          
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default CreateFood;