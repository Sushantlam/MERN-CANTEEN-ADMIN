import React, { useState } from 'react';
import Sidebar from '../../Component/SideBar/Sidebar';
import Navbar from '../../Component/Navbar/Navbar';
// import './CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUse = () => {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    userName: '',
    email: '',
    password: '',
    
});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setItem({
      ...item,
      [name]: value,
    });
  };

  console.log(item);

//   const handleImage = async (e) => {
//     const file = e.target.files[0];
//     try {
//       const base64 = await convertBase64(file);
//       console.log(base64);
//       setItem({
//         ...item,
//         image: base64,
//       });
//       console.log(item);
//     } catch (error) {
//       console.error('Error converting image to base64:', error);
//     }
//   };
  
//   const convertBase64=(file)=>{
//     return new Promise((resolve, reject)=>{
//       const fileReader= new FileReader()
//       fileReader.readAsDataURL(file)

//       fileReader.onload=()=>{
//         resolve(fileReader.result)
//       }

//       fileReader.onerror=()=>{
//         reject(error)
//       }
//         })
//   }

  const handleClick = async (e) => {
    e.preventDefault();
    // const formData = new FormData()
    // formData.append('userName', item.userName)
    // formData.append('email', item.email)
    // formData.append('password', item.password)
   

    try {
      const res = await axios.post('https://canteen-api-nodej.onrender.com/user/signup', item);
      console.log(res);
     

      // Clear the input fields immediately
      setTimeout(()=>{
        toast('User created successfully!');
        setItem({
          userName: '',
          email: '',
          password: '',
          
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
          <h3 className='productTitle'>Create User</h3>
          <div className='addContentBox'>
            <div className='inputName'>
              <h4>Name</h4>
              <input
                className='textField'
                type='text'
                name='userName'
                value={item.userName}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>email</h4>
              <input
                className='textField'
                type='text'
                name='email'
                value={item.email}
                onChange={handleChange}
              />
            </div>
            <div className='inputName'>
              <h4>Password</h4>
              <input
                className='textField'
                type='text'
                name='password'
                value={item.password}
                onChange={handleChange}
              />
            </div>
           
          </div>
          <button className='addButton' onClick={handleClick}>
            Create User
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default CreateUse;