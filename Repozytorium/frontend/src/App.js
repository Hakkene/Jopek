import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
//import './App.css';
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import Login from "./components/Login";
import Navbar from './components/Navbar';
import Register from './components/Register';
import {Route, Routes } from "react-router-dom";


function App() {

  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  //fetchowanie wszystkich produktów  
  useEffect(() => {
      setLoading(true)
      fetch('http://localhost:8000/api/',
      {  'method':'GET' } )
      .then(resp=>resp.json())        
      .then(resp =>setProducts(resp))
      .catch(error=>console.log(error))
      .finally(() => setLoading(false))
      }, [])
     
     /* const found = products.find(obj => {
        return obj.slug === "mtg";
      });
      console.log(found.price)
      */
      
      
  
  return (
   <div className="app">
    {token ? <Navbar token={token} settoken={setToken} key={Date.now()}/> : <Navbar token={null} settoken={setToken}/>}

    <Routes>
        <Route path="/">
          <Route index element={<ProductList propProducts= {products}/>}/>
          <Route path=":slug" element={<ProductPage propProducts= {products}/>}/> 
          <Route path="login" element= {<Login token={token} settoken={setToken}/>} /> 
          <Route path="register" element= {<Register/>} />     
        </Route>
    </Routes>
    </div>
  )




}
export default App;
