import React, { useState, useEffect } from 'react';
import {useParams, useLocation}from "react-router-dom"


function ProductPage(props) {
    const {addHandler, removeHandler, cartItems} = props
    const location = useLocation()
    const fromPlist = location.state?.data
    const test = cartItems.filter((j)=>j.id !== fromPlist.id)
 






  return (

    <section class="section is-small">
      
                   
        <div class="columns is-multiline box">
            <div class="column is-half">
            
            {fromPlist.image.map(b =>
                     <div key={b.image}>
                        <figure class="image is-rectangle">
                        <img src={b.image} alt="#"/>
                        </figure>                                             
                     </div>  
                     
                 )}
                     
            </div>
            <div class="column is-half">
                <section class="section has-text-centered is-medium">
                    <p class="is-size-2">Cena: {fromPlist.price} zł</p>
                    <p class="is-size-5">Sztuk na stanie: {fromPlist.stock}</p>
                    <p class="is-size-5">numer id: {fromPlist.id}</p>
                    <button onClick={()=>addHandler(fromPlist)} class="button is-primary">dodaj do koszyka</button>
                    <button onClick={()=>removeHandler(fromPlist)} class="button is-danger">usun z koszyka</button>
                    {cartItems.map((item)=> ( <div>{item.id} oraz quant {item.quant}</div>                   
                   
                        ))}
                    {}
                        
                </section>
            </div>
            <div class="column box"> 
                <h1 class="title">{fromPlist.name}</h1>
                {fromPlist.category.map(b =>
                     <div key={b.name}>                        
                        <p class="has-text-warning-dark">{b.name}</p>                                                            
                     </div>  
                     
                 )}
                <h2 class="subtitle">{fromPlist.description}</h2>
            </div>
        </div>
        
    </section>
    
 
  )
}

export default ProductPage



/*{props.propProducts.map(product => {
        return(
            <div>
        <h2>{product.name}</h2>
        </div>
             
               )
   })}




   <button onClick={localStorage.removeItem("cartItems")} class="button is-danger">usun cookies</button>
   */