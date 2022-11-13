import React, { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
//import './App.css';
import ProductList from './components/ProductList'
import ProductPage from './components/ProductPage'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Cart from './components/Cart'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) ?? []
  )

  const addHandler = (product) => {
    const exists = cartItems.find((j) => j.id === product.id)
    if (exists) {
      const newCartItems = cartItems.map((j) =>
        j.id === product.id ? { ...exists, quant: exists.quant + 1 } : j
      )
      //jeżeli id sie zgadza to quant+1, inaczej zostaw
      if (product.stock > exists.quant) {
        setCartItems(newCartItems)
        localStorage.setItem('cartItems', JSON.stringify(newCartItems))
      }
    } else {
      //jeżeli nie ma w koszyku to dopisz i dodaj mu quant 1
      const newCartItems = [...cartItems, { ...product, quant: 1 }]
      setCartItems(newCartItems)
      localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    }
  }
  const removeHandler = (product) => {
    const exists = cartItems.find((j) => j.id === product.id)
    if (exists.quant === 1) {
      const newCartItems = cartItems.filter((j) => j.id !== product.id)
      setCartItems(newCartItems)
      localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    } else {
      const newCartItems = cartItems.map((j) =>
        j.id === product.id ? { ...exists, quant: exists.quant - 1 } : j
      )
      setCartItems(newCartItems)
      localStorage.setItem('cartItems', JSON.stringify(newCartItems))
    }
  }
  const [loading, setLoading] = useState(false)
  //fetchowanie wszystkich produktów
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/api/', { method: 'GET' })
      .then((resp) => resp.json())
      .then((resp) => setProducts(resp))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  /* const found = products.find(obj => {
        return obj.slug === "mtg";
      });
      console.log(found.price)
      */

  return (
    <div className='app'>
      {token ? (
        <Navbar
          token={token}
          settoken={setToken}
          cartItems={cartItems}
          key={Date.now()}
        />
      ) : (
        <Navbar token={null} settoken={setToken} />
      )}

      <Routes>
        <Route path='/'>
          <Route index element={<ProductList propProducts={products} />} />
          <Route
            path=':slug'
            element={
              <ProductPage
                propProducts={products}
                cartItems={cartItems}
                addHandler={addHandler}
                removeHandler={removeHandler}
              />
            }
          />
          <Route
            path='login'
            element={<Login token={token} settoken={setToken} />}
          />
          <Route path='register' element={<Register />} />
          <Route
            path='cart'
            element={
              <Cart
                cartItems={cartItems}
                addHandler={addHandler}
                removeHandler={removeHandler}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  )
}
export default App
