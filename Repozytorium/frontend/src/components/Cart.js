import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {flushSync} from 'react-dom';

function Cart(props) {
  const { cartItems, addHandler, removeHandler } = props
  const quantPrice = cartItems.reduce((a, c) => a + c.quant * c.price, 0)

  //console.log(cartItems)
  const [loading, setLoading] = useState('True')
  const [error, setError] = useState('')
  const [token] = useState(localStorage.getItem('userToken') ?? null)
  const [notes, setNotes] = useState('1')
  const [city, setCity] = useState('1')
  const [street, setStreet] = useState('1')
  const [zipcode, setZipcode] = useState('1')
 

  //TODO POŁĄCZYĆ W BACKENDZIE CREATE



useEffect(()=> {


})

  // const orderproductHandler = () => {
  //   setError('')
  //   setLoading('')
  //   console.log(orderid, "wielki chuj 33")
  //   token
  //     ? cartItems.map((j) =>
  //         axios
  //           .post(
  //             'http://localhost:8000/orderproduct/',
  //             {
  //               order: orderid,
  //               product: j.id,
  //               quantity: j.quant,
  //             },
  //             {
  //               headers: {
  //                 Authorization: 'Token ' + token,
  //               },
  //             }
  //           )
  //           .then((response) => console.log(response.data))
           

  //           .catch((error) => {
  //             console.log(error.response.data.body)
  //             setError(error.response.data.body)
  //           })
  //       )
  //     : setError('You must be logged in')
  // }

  const orderHandler = () => {
    setError('')

    token
      ? axios
          .post(
            'http://localhost:8000/order/',
            {
              notes: notes,
              price: quantPrice,
              city: city,
              street: street,
              zipcode: zipcode,
            },
            {
              headers: {
                Authorization: 'Token ' + token,
              },
            }
          )    
         
          .then((response) => {
            cartItems.map((j) =>
              axios.post(
                'http://localhost:8000/orderproduct/',
                {
                  order: response.data.id,
                  product: j.id,
                  quantity: j.quant,
                },
                {
                  headers: {
                    Authorization: 'Token ' + token,
                  },
                }
              )
            )
          })
          .catch((error) => {
            console.log(error.response.data.body)
            setError(error.response.data.body)
          })
      : setError('You must be logged in')
  }


  return (
    <div class='section'>
      <div class='column is-half is-offset-one-quarter '>
        <p class='title'>Zawartość koszyka:</p>
        <div></div>
        {cartItems.map((item) => (
          <div key={item.id} class='columns is-flex is-vcentered box'>
            <div class='column is-narrow'>
              {
                <div key={item.thumbnail}>
                  <figure class='image is-96x96'>
                    <img src={item.thumbnail} alt='#' />
                  </figure>
                </div>
              }
            </div>

            <div class='column '>{item.name}</div>
            <div class='column has-text-right'>
              {item.quant} x {item.price.toFixed(2)}zł
            </div>

            <button onClick={() => addHandler(item)} class='button is-primary'>
              +
            </button>
            <button
              onClick={() => removeHandler(item)}
              class='button is-danger'
            >
              -
            </button>
          </div>
        ))}
        <div class='box has-text-centered'>
          <strong>
            {cartItems.length === 0 && <div>koszyk jest pusty</div>} łącznie do
            zapłacenia: {quantPrice} zł
          </strong>
          <br />
          <button
            onClick={() => {
              localStorage.removeItem('cartItems')
            }}
            class='button is-danger '
          >
            opróżnij koszyk
          </button>
        </div>
      </div>
      <div class='section mx-6'>
        <p class='title'>Adres zamówienia:</p>
        <div class='field'>
          <label class='label'>Miasto</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='Wrocław'
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <div class='field'>
          <label class='label'>Adres</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='Curie-Skłodowskiej 51/5'
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        </div>

        <div class='field'>
          <label class='label'>Kod pocztowy</label>
          <div class='control'>
            <input
              class='input'
              type='text'
              placeholder='50-369'
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        </div>

        <div class='field'>
          <label class='label'>
            Dodatkowe informacje dla sprzedawcy (opcjonalne){' '}
          </label>
          <div class='control'>
            <textarea
              class='textarea'
              placeholder='tekst'
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>

        <p>
          {' '}
          Zamawiając godzisz się na <a>zasady i warunki korzystania</a>
        </p>

        <button onClick={orderHandler} class='button is-info mr-1'>
          Zapłać i złóż zamówienie
        </button>
        
      </div>
    </div>
  )
}

export default Cart

/*

    axios.post(
      'http://localhost:8000/orderproduct/',
      {
        order: orderid,
        product: "1",
        quantity: "1",
      },
      {
        headers: {
          Authorization: 'Token ' + token,
        },
      }
    ).then((response)=>console.log(response.data))
    .then(() => {
      setLoading('False')
    })

    .catch((error) => {
      console.log(error.response.data.body)
      setError(error.response.data.body)
    })

    */
