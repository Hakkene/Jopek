import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
//import './App.css';
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import {Route, Routes } from "react-router-dom";


function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
    
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
   
    <Routes>
        <Route path="/">
        <Route index element={<ProductList propProducts= {products}/>}/>
        <Route path=":slug" element={<ProductPage propProducts= {products}/>}/>
      
      </Route>
    </Routes>
   
  )




}
export default App;
