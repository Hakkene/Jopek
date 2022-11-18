import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Rent() {

const [products, setProducts] = useState([])
const [token] = useState(localStorage.getItem('userToken') ?? null)
const [loading, setLoading] = useState("False")


function rent(id)  {
    setLoading("False")
axios.post(    
    "http://127.0.0.1:8000/rentproduct/",
    {
      product: id      
    },
    {
      headers: {
        Authorization: 'Token ' + token,
      },
    }
  ).then((response)=>{
    console.log(response.data, "odpowiedz serwera")
  }).then(()=>{
    alert("Wypożyczono")
    setLoading("True")
  })
  
 
}

useEffect( () => {
    axios.get('http://127.0.0.1:8000/api/?active=True').then((response) => {
      setProducts(response.data.results)
      console.log(response.data)
    })
  }, [loading] )





  return (
    <section class="section is-small">
        <div class="column is-three-fifths is-offset-one-fifth">
            {products.length === 0 && <h1 class="title has-text-centered">Przepraszamy, obecnie wszystkie pozycje są wypożyczone</h1>}
        {products.map((b) => (
         <div  key={b.id} class='columns is-flex is-vcentered box mx-3'>
         <div class='column is-narrow'>
           {
             <div key={b.image}>
               <figure class='image is-96x96'>
                 <img src={b.image} alt='#' />
               </figure>
             </div>
           }
         </div>

         <div  class='column '>
         <Link to={"/"+b.slug}> {b.name} </Link>
          </div>
         

         <button class='button is-primary' onClick={() => rent(b.id)}>
           Wypożycz
         </button>
         
       </div>
          
          ))}




        </div>







    </section>
  )
}

export default Rent