import React, { useState, useEffect } from 'react';
import {useParams, useLocation}from "react-router-dom"


function ProductPage() {

    const location = useLocation()
    const fromPlist = location.state?.data
   console.log(location);
    console.log(fromPlist)







  return (

    <section class="section is-medium">
        <div>Login {fromPlist.name}</div>
                   
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

   */