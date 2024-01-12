import React, { useContext } from 'react'
import Home from './Pages/Home/Home'
import {
  BrowserRouter as Router,
 Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './Pages/Login/Login';
import AllProduct from './Pages/AllProduct/AllProduct';
import AllUser from './Pages/AllUser/AllUser';
import Useradd from './Pages/Useradd/Useradd';
import Order from './Pages/Ordrer/Order';
import CreateFood from './Pages/CreateFood/CreateFood';
import { AuthContext } from './Context/Auth';
import ProductById from './Pages/ProductById/ProductById';
import { useEffect } from 'react';
import CreateUse from './Pages/CreateUser/CreateUse';

const App = () => {

  const ProtectedRoutes =({children})=>{
    const {email}= useContext(AuthContext)
    console.log(email);
    if(!email){
      return <Navigate to='/login'/>
    }
    
    return children
  }

  // useEffect(()=>{
  // ProtectedRoutes()
  // }, [])
  return (
    
      <Router>
      <Routes>
        <Route path='/'>
          <Route path='login' element={<Login/>}/>
          <Route index element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>

          </Route>
        
        <Route path='/allProduct' element={<ProtectedRoutes><AllProduct/></ProtectedRoutes>}/>
        <Route path='/allUser' element={<ProtectedRoutes><AllUser/></ProtectedRoutes>}/>
        <Route path='/addUser' element={<ProtectedRoutes><CreateUse/></ProtectedRoutes>}/>
        <Route path='/orderlist' element={<ProtectedRoutes><Order/></ProtectedRoutes>}/>
        <Route path='/createFood' element={<ProtectedRoutes><CreateFood/></ProtectedRoutes>}/>
        <Route path='/allProduct/:id' element={<ProtectedRoutes><ProductById/></ProtectedRoutes>}/>
        
        
        
        
    
      </Routes>
    </Router>
     
      
 
  )
}

export default App