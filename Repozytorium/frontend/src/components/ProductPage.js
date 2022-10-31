import React, { useState, useEffect } from 'react';
import {useParams}from "react-router-dom"

function ProductPage(props) {
    
    const { slug } =useParams();
    
    const found = props.propProducts.find(obj => {
        return obj.slug === slug
      });
      console.log(found.price)

    




  return (

    <section class="section is-medium">
        
                   
        <div class="columns is-multiline box">
            <div class="column is-half">
            
            {found.image.map(b =>
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
                <h1 class="title">{found.name}</h1>
                {found.category.map(b =>
                     <div key={b.name}>
                        <p class="has-text-warning-dark">{b.name}</p>                                         
                     </div>  
                     
                 )}
                <h2 class="subtitle">{found.description}</h2>
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