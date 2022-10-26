import React, { useState, useEffect } from 'react';

function ProductList() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/api/',
        //fetch('https://jsonplaceholder.typicode.com/posts',
        {  'method':'GET' } )
        .then(resp=>resp.json())
        .then(resp =>setProducts(resp))
        .catch(error=>console.log(error))


    }, [])

/*
  return (
    <div className="Product-list">ProductList
   
    {products.map(product => {
         return(
         <h2>{product.name}</h2>
              
                )
    })}
    
    
    </div>
  )
}
*/
return (
    <div>
        {
            products.map(j =>
             <div>
                 {j.name}
                 {j.category.map(b =>
                     <div>
                         {b.name}
                         
                     </div>
                 )}
             </div>
            )
        }
    </div>
)
    }
export default ProductList