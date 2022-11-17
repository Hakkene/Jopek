import React, { useState, useEffect } from 'react'
import axios from 'axios'

function OrderHistory() {
  const [token] = useState(localStorage.getItem('userToken') ?? null)
  const [error, setError] = useState('')
  const [orderlist, setOrderlist] = useState([])
  useEffect(() => {
    axios('http://localhost:8000/profile/', {
      headers: {
        Authorization: 'Token ' + token,
      },
    })
      .then((res) => {
        console.log(res.data)
        setOrderlist(res.data)
      })
      .catch((error) => {
        console.log(error.response.data.body)
        setError(error.response.data.body)
      })
  }, [])



  return (
    <div class='column is-three-fifths is-offset-one-fifth '>
      <section class='section box'>
        <h1 class='title '>Twoja historia zamówień: </h1>
        {orderlist.map((a) => (
          <div key={a.userid}>
            {a.order.map((b) => (
              <div class='columns is-flex is-vcentered box' key={b.id}>
                <div class='column has-text-centered'>
                  <div>
                    <h2 class='subtitle'>
                      Numer zamówienia: <strong>{b.id}</strong> <br />
                      <small>
                        złożono {b.order_date}
                        <br />
                        <p>Status zamówienia: {b.status}</p>
                      </small>
                    </h2>

                    {b.OrderProduct.map((c) => (
                      <div key={c.id}>
                        <p>
                          <strong>Nazwa produtu: {c.name} </strong>
                          <br />
                          Sztuk: {c.quantity}, cena za sztukę: {c.price}
                          zł
                        </p>
                        <br />
                      </div>
                    ))}
                  </div>
                  <h3 class='subtitle'>
                    Łącznie zapłacono: <strong>{b.price}zł</strong>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}

export default OrderHistory

/*
<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png"/>
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
        <br/>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    
  </div>
  
</article> 













*/
