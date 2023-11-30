  import React from 'react'
import Sidebar from '../../Component/SideBar/Sidebar'
import "./Home.css"
import Navbar from '../../Component/Navbar/Navbar'
import {MdOutlineProductionQuantityLimits, MdLogout, MdDashboard} from "react-icons/md"
import {BsFillPersonFill} from "react-icons/bs"

import {FaRupeeSign} from "react-icons/fa"
import Usefetch from '../../Usefetch/Usefetch'
import Featured from '../../Component/Featured/Featured'
import Chart from '../../Component/Chart/Chart'

import UseFetch from "../../Usefetch/Usefetch"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import { ToastContainer, toast } from 'react-toastify';
// import   './AllUser.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'



const Home = () => {

  // const {data}= Usefetch("/product")
  // console.log(data);
  const { data} = UseFetch("https://canteen-api-nodej.onrender.com/user/countUser");
  console.log("user/countUser", data);
  const { reFetchData} = UseFetch("https://canteen-api-nodej.onrender.com/user");
  // console.log("product", initialData);
  const [Data, setData] = useState();
  const [error, setError] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [totalPrice, setTotalPrice] = useState([])
  const [orderCount, setOrderCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]= useState([])
 // Number of items per page


 
  
  const nextPage = () => {
    if(lastPage<=currentPage){
     setCurrentPage(1)
    }else{
      setCurrentPage(currentPage + 1);
    }
   
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  



//its for the pagination
  const fetchData =async()=>{
    try {
      const response = await axios.get(`https://canteen-api-nodej.onrender.com/user?page=${currentPage}&key=${search}`)
      console.log("response", response.data.data);
      setData(response.data.data)
      
      setLastPage(response.data.lastPage)

    } catch (error) {
      
    }
  }

  const fetchAllOrder =async()=>{
    try {
      const response = await axios.get("https://canteen-api-nodej.onrender.com/orderDemo/allOrder")
      console.log("allOrder", response.data);
     const totalOrderPrice = response.data.reduce((total, order) => total + order.totalPrice, 0);

     console.log('Total of all totalPrice values:', totalOrderPrice);
   setTotalPrice(totalOrderPrice)
    } catch (error) {
      console.log(error);
    }
  }

  const countOrder =async()=>{
    try {
      const response = await axios.get("https://canteen-api-nodej.onrender.com/orderDemo/countOrder")
      console.log('Total ', response);
   setOrderCount(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(Data);


  
 

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://canteen-api-nodej.onrender.com/user/${id}`);
      console.log('Item deleted successfully!',response);
  
      if (response.status === 201) {
        toast('Item deleted successfully!');
        
        // Update the Data state by filtering out the deleted item
       setTimeout(()=>{
        reFetchData()
       }, 1500)
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  
  useEffect(() => {
    fetchData();
    countOrder()
    fetchAllOrder()
    
  }, [currentPage,lastPage,search]);
  
  
  // useEffect(() => {
  //   fetchData();
   
  // }, [currentPage, lastPage, search]);
  return (
    <div className='mainContainer'>
        <Sidebar/>
        <div className="mainHome">
            <Navbar/>
            <div className="contentBox">
              <div className="box1">
              <h3>User</h3>
              <div className="subBox">
              <BsFillPersonFill className='profileIcon'/><span className='number'>
                {data.map((userCount)=> {
                  return ( <div className="subBox">{userCount.count}</div>)
                })

              }</span>
              </div>
              </div>
              <div className="box1">
              <h3>Total Order</h3>
              <div className="subBox">
              <MdOutlineProductionQuantityLimits className='profileIcon'/><span className='number'>{orderCount}</span>
              </div>
                </div>
                <div className="box1">
                <h3>Total Earning</h3>
                <div className="subBox">
                <FaRupeeSign className='profileIcon'/><span className='number'>{totalPrice}</span>
                </div>
                </div>
                
            </div>
            <div className="chartFeatured">
           
            <div className="mainTable">
              
              <div className='table'>
                <div className="searchingField">

                <input type="text" className='searchFilter' onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search Here....'/> <button className='searchButton'>Search</button>

                </div>
                  <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
         
          <TableCell className="tableCell">Name</TableCell>
          <TableCell className="tableCell">Email</TableCell>
         
         
        
          <TableCell className="tableCell">Action</TableCell>
         
        </TableRow>
      </TableHead>
      <TableBody>
        {Data?.map((row) => (
          <TableRow key={row._id}>
           
            {/* <TableCell className="tableCell">
              {/* <div className="cellWrapper">
                <img src={row.img} alt="" className="image" />
                {row.product}
              </div> 
            </TableCell> */}
            <TableCell className="tableCell">{row.userName}</TableCell>
             <TableCell className="tableCell">{row.email}</TableCell>
            
            
            <TableCell className="tableCell"> <Link to={`/allProduct/${row._id}`}></Link> <button className='delete' onClick={()=>handleDelete(row._id)}>Delete</button></TableCell>
           
          
            {/* <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <ToastContainer/>
  <button onClick={prevPage} disabled={currentPage===1} >
        Previous Page
      </button>
  {currentPage} page {lastPage}

      <button onClick={nextPage} >Next Page</button>
 
  </div>
  
  </div>
   </div>
            </div>
        </div>

  )
}

export default Home