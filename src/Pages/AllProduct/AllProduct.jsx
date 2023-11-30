import React, { useEffect, useState } from 'react'
import UseFetch from "../../Usefetch/Usefetch"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from '../../Component/SideBar/Sidebar';
import Navbar from '../../Component/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import   './AllProduct.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
const AllProduct = () => {

  const {  reFetchData} = UseFetch("https://canteen-api-nodej.onrender.com/product");
   console.log("product", reFetchData);
  const [Data, setData] = useState();
  const [error, setError] = useState([]);
  const [lastPage, setLastPage] = useState();
  
  const [foodItems, setFoodItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [key, setKey]= useState([])
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
      const response = await axios.get(`https://canteen-api-nodej.onrender.com/product?page=${currentPage}&key=${key}`)
      console.log("response", response.data.data);
      setData(response.data.data)
      
      setLastPage(response.data.lastPage)

    } catch (error) {
      
    }
  }

  // console.log(search);


 
  


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://canteen-api-nodej.onrender.com/product/${id}`);
      console.log(response);
  
      if (response.status === 201) {
       
        
        // Update the Data state by filtering out the deleted item
      
        toast('Item deleted successfully!');
           reFetchData()
     
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  
  
  
  
  useEffect(() => {
    fetchData();
  
   
  }, [currentPage, lastPage, key]);



  return (
    <>
    <div className='addSidebar'>
        <Sidebar />
        <div className='addNavbar'>
          <Navbar />
           
            <div className="mainTable">
              
              <div className='tables'>
              <input type="text" className='searchFilter' onChange={(e) => setKey(e.target.value)} value={key} /> <button>Search</button>
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
         
          <TableCell className="tableCell">Title</TableCell>
          <TableCell className="tableCell">Category</TableCell>
         
         
         <TableCell className="tableCell">Rating</TableCell>
         
          <TableCell className="tableCell">Price</TableCell>
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
            <TableCell className="tableCell">{row.title}</TableCell>
             <TableCell className="tableCell">{row.category}</TableCell>
            
             <TableCell className="tableCell">{row.rating}</TableCell>
             <TableCell className="tableCell">{row.price}</TableCell>
            <TableCell className="tableCell"> <Link to={`/allProduct/${row._id}`}><button>Edit</button></Link> <button onClick={()=>handleDelete(row._id)}>Delete</button></TableCell>
           
          
            {/* <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <button onClick={prevPage} disabled={currentPage == 1}>
        Previous Page
      </button>
  {currentPage} page {lastPage}

      <button onClick={nextPage} >Next Page</button>
 
  </div>
  <ToastContainer/>
  
  </div>
   </div>
   </div>
  </>

  )
}

export default AllProduct