import React, { useContext, useState } from 'react'
import "./Navbar.css"
import HeroImg from "../../Photo/Hero.png"
import {MdDarkMode} from "react-icons/md"

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Auth'

const Navbar = () => {
  const { email, dispatch, error } = useContext(AuthContext)
  const [open, setOpen]= useState(false)

  const navigate = useNavigate()

  const hanldeClick = () => {
    try {
      dispatch({ type: "Log_Out" })
      navigate("/login")
    } catch (error) {


    }
  }
  return (
    <div className='nav'>
      <div className="navHead-left">
      <div className="eng">
               
               <MdDarkMode className='darkmode'/>
              
                   
   
               </div>
               <div>
        <div className='profileSet'>
<img className='profileImg' src={HeroImg} alt="" onClick={()=> setOpen(!open)} />
{open && <div className='logout'>
<Link to="/login" onClick={hanldeClick}>{open && <button >Log Out</button>}</Link>

</div>}

</div></div>
</div>
    
    </div>
  )
}

export default Navbar