
import { Link } from "react-router-dom";

function ProductList(props) {

   
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
   

<div id="app">
     
    <section class="main-content columns is-fullheight">
      
      <aside class="column is-2 is-fullheight section ">
        <p class="menu-label">Navigation</p>
        <ul class="menu-list">
          <li>
            <a href="#" class="">
              <span class="icon"><i class="fa fa-home"></i></span> Home
            </a>
          </li>
          <li>
            <a href="#" class="is-active">
              <span class="icon"><i class="fa fa-table"></i></span> Links
            </a>
    
            <ul>
              <li>
                <a href="#">
                  <span class="icon is-small"><i class="fa fa-link"></i></span> Link1
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="icon is-small"><i class="fa fa-link"></i></span> Link2
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="">
              <span class="icon"><i class="fa fa-info"></i></span> About
            </a>
          </li>
        </ul>
      </aside>
    
      <div class="container column is-10">
        <div class="section">
        
        <div class="columns is-multiline is-hovered">
            {
            props.propProducts.map(j =>
             <div key={j.id} class="column is-one-third " >
                <div class="box">
                <Link to={"/"+j.slug} state={{ data: j }}>
                 <p class="title is-primary">{j.name}</p>
                 <figure class="image is-128x128" > 
                    <img src={j.thumbnail} alt='#' />                                              
                 </figure>
                {// <Link to={"/"+j.slug }>link test</Link>
                }                 

                 {j.category.map(b =>
                     <div key={b.name}>
                        <p class="subtitle">{b.name}</p>                                                 
                     </div>
                     
                 )}
              
              </Link>
              </div>
              </div>
            )
        }
 </div>
          
        </div>
      </div>
      
    </section>
    
            
      </div>
        
   
    </div>
)
    }
export default ProductList