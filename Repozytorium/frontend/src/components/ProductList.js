import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
function ProductList() {
  const [products, setProducts] = useState([])
  const [search, setSearch] =useState('')

  const getList = (test) => {
    setSearch('')
    console.log(test, '<- test')
    axios.get('http://127.0.0.1:8000/api/' + test).then((response) => {
      setProducts(response.data)
      console.log(response.data)
    })
  }

  const allList = () => {
    axios.get('http://127.0.0.1:8000/api/').then((response) => {
      setProducts(response.data)
      console.log(response.data)
    })
  }
  useEffect(() => {
    allList()
  }, [])

  console.log(products, "products")
  return (
    <div>
      <div id='app'>
        
        <section class='main-content columns is-fullheight'>
          
          <aside class='column is-2 is-fullheight section '>
          <div class="field ">
  <p class="control is-expanded">
    <input class="input" type="text" placeholder="Nazwa" value={search} onChange={(e) => setSearch(e.target.value)}/>
  </p>
  <p class="control">
    <button class="button is-info mt-2" onClick={() => {getList('?name='+search)}}>
      Wyszukaj
    </button>
  </p>
</div>
            <p class='menu-label'>Kategorie</p>
            
            <ul class='menu-list'>
              <li>
                <a  class='' onClick={() => {allList()}}>
                  Wszystkie
                </a>
              </li>
              <li>
                <a  class='' onClick={() => {getList('?category=Planszowe')}}>
                  Planszowe
                </a>
              </li>
              <li>
                <a  class='' onClick={() => {getList('?category=Karciane')}}>
                  Karciane
                </a>
              </li>
              <li>
                <a  class='' onClick={() => {getList('?category=Figurkowe')}}>
                  Figurkowe
                </a>
              </li>
              <li>
                <a  class='' onClick={() => {getList('?category=Akcesoria')}}>
                  Akcesoria
                </a>
              </li>
            </ul>
          </aside>

          <div class='container column is-10'>
            <div class='section'>
               <div class='columns is-multiline is-hovered'>
                {products.map((j) => (
                  <div key={j.id} class='column is-one-third '>
                    <div class='card'>
                      <div class='card-image has-text-centered'>
                        <Link to={'/' + j.slug} state={{ data: j }}>
                          <div class='card-content'>
                            <p class='title is-primary has-text-centered'>
                              {j.name}
                            </p>

                            <div class='card-image'>
                              <figure class='image is-square'>
                                <img src={j.image} alt='#' />
                              </figure>
                              <div class='content '>
                                <p class='title'>cena {j.price} zł</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default ProductList
