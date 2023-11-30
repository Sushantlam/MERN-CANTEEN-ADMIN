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
import   './AllUser.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
const AllUser = () => {

   const { reFetchData} = UseFetch("https://canteen-api-nodej.onrender.com/user");
  // console.log("product", initialData);
  const [Data, setData] = useState();
  const [error, setError] = useState([]);
  const [lastPage, setLastPage] = useState();
  
  const [foodItems, setFoodItems] = useState([]);
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
      const response = await axios.get(`/user?page=${currentPage}&key=${search}`)
      console.log("response", response.data.data);
      setData(response.data.data)
      
      setLastPage(response.data.lastPage)

    } catch (error) {
      
    }
  }

  console.log(search);


 
  


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/user/${id}`);
      console.log('Item deleted successfully!',response);
  
      if (response.status === 201) {
        toast('Item deleted successfully!');
        
        // Update the Data state by filtering out the deleted item
      reFetchData()
      
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  
  
  
  
  useEffect(() => {
    fetchData();
    
  }, [currentPage, search]);



  return (
    <>
     <div className='mainContainer'>
      <div className="sideBar">
      <Sidebar/>
      </div>
        
        <div className="mainHome">
            <Navbar/>
            </div>
           
            <div className="mainTable">
              
              <div className='tables'>
              <input type="text" className='searchFilter' onChange={(e) => setSearch(e.target.value)} value={search} /> <button className='searchButton'>Search</button>
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
            
            
            <TableCell className="tableCell"> <Link to={`/allProduct/${row._id}`}><button>Edit</button></Link> <button onClick={()=>handleDelete(row._id)}>Delete</button></TableCell>
           
          
            {/* <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <ToastContainer/>
  <button onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
  {currentPage} page {lastPage}

      <button onClick={nextPage} >Next Page</button>
 
  </div>
  
  </div>
   </div>
  </>

  )
}

export default AllUser