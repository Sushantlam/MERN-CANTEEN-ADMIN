import React from 'react';
import UseFetch from '../../Usefetch/Usefetch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from '../../Component/SideBar/Sidebar';
import Navbar from '../../Component/Navbar/Navbar';
import './Order.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Order = () => {

  const { data, reFetchData } = UseFetch('https://canteen-api-nodej.onrender.com/orderDemo/allOrder');
  console.log(data);
  let red = '#A020F0'
  let pink= '#ffc0cb'
const [bgColor, setBgColor]= useState(red)
const [order, setOrder]= useState('Ordered')
  

const handleOrder= async(id)=>{
    console.log(id);
try {
      const changeStatus = await axios.put(`https://canteen-api-nodej.onrender.com/orderDemo/orderStatus?id=${id}`)

      if(changeStatus){

        reFetchData()

        

      }
      
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    handleOrder()
  },[data])

 
  return (
    <>
      <div className='addSidebar'>
        <Sidebar />
        <div className='addNavbar'>
          <Navbar />
        </div>
        <div className='mainTables'>
          <div className='tables'>
            <TableContainer component={Paper} className='table'>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                
                <TableBody>
                  {data.slice(0).reverse()?.map((row) =>   (
                    
                    <TableRow key={row._id}>
                      <TableCell className='tableCell'>{row.email}</TableCell>
                     
                      <TableCell className='tableCell' colSpan={4}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-label='nested table'
                          >
                            
                           
                              {row?.item?.map((list, index) => (
                                <TableRow key={list._id}>
                                  {list?.title ? <TableCell >Name: {list?.title} </TableCell>: "" } 
                               {list?.price ? <TableCell >Per: Rs.{list?.price} /-</TableCell>: "" } 
                               {list?.quantity ? <TableCell >Qty: {list?.quantity}</TableCell>: "" } 
                              
                                
                                 
                                  
                                </TableRow>
                              ))}
                                 
                            
                           
                          </Table>
                          
                        </TableContainer>
                      </TableCell>
                      <TableCell className='tableCell'>Total-Price: {row.totalPrice}</TableCell>
                      <TableCell className='tableCell'>
                        <button style={{backgroundColor: row.status==='Pending' ? 'red' : 'pink', padding: 7, borderRadius: 7}}  onClick={()=>handleOrder(row._id)} >{row.status}</button> 
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
