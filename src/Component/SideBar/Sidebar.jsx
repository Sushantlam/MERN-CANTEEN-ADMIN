import React, { useContext } from 'react'
import "./Sidebar.css"
import {BsFillPersonFill, BsPersonFillAdd} from "react-icons/bs"
import {MdOutlineProductionQuantityLimits, MdLogout, MdDashboard} from "react-icons/md"
import {FaJediOrder} from "react-icons/fa"
import {IoMdInformationCircle} from "react-icons/io"
import {ImStatsDots} from "react-icons/im"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth'


const Sidebar = () => {

  const Navigate = useNavigate()

  const { email, dispatch, error } = useContext(AuthContext)

  const hanldeClick = () => {
    try {
      dispatch({ type: "Log_Out" })
      Navigate("/login")
    } catch (error) {


    }
  }
  return (
    <div className='sideBar'>
        <div className='mainHead'>
         <Link to="/" className='Mainhead'> <span className="heading">Canteen System </span></Link>  

        </div>
       
       <hr />
        <div className='sideBarcontent'>
            <ul>

         
                <p>User</p>
                   <li><Link to='/addUser' className='link'><BsPersonFillAdd className='icon'/><span>Add User</span></Link></li>
               
                
               
                
            
                <p>Product</p>
                 <li><Link to='/allProduct' className='link'><MdOutlineProductionQuantityLimits className='icon'/><span>Product</span></Link></li>
                <li><Link to='/createFood' className='link'><IoMdInformationCircle className='icon'/><span>Add Product</span></Link></li>
               
                
           

        
            <p>Order</p>
            <li><Link to='/orderlist' className='link'><FaJediOrder className='icon'/><span>Order-list</span></Link></li>
            

           
            <p>Admin</p>
           
            <li><MdLogout className='icon'/><span onClick={hanldeClick} >Logout</span></li>
           
               
                
            </ul>

        </div>
        
    </div>
  )
}

export default Sidebar