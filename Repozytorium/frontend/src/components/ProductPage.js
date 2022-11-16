import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

function ProductPage(props) {
  const { addHandler, removeHandler, cartItems } = props
  const location = useLocation()
  const fromPlist = location.state?.data
  const [error, setError] = useState('')
  const [body, setBody] = useState('')
  const [token] = useState(localStorage.getItem('userToken') ?? null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState('True')

  useEffect(() => {
    axios('http://localhost:8000/comments/' + '?product=' + fromPlist.id)
      .then((res) => {
        console.log(res.data)
        setComments(res.data)
      })
      .catch((error) => {
        console.log(error.response.data.body)
        setError(error.response.data.body)
      })
  }, [loading])

  const commentHandler = () => {
    setError('')
    setLoading('')
    
    token
      ? axios
          .post(
            'http://localhost:8000/comments/',
            {
              product: fromPlist.id,
              body: body,
            },
            {
              headers: {
                Authorization: 'Token ' + token,
              },
            }
          )
          .then(() => {
            setLoading('False')
          })

          .catch((error) => {
            console.log(error.response.data.body)
            setError(error.response.data.body)
          })
      : setError('You must be logged in')
      setBody('')
  }

  return (
    <section class='section is-small mx-6'>
      <div class='columns is-multiline box'>
        <div class='column is-half'>
          {fromPlist.image.map((b) => (
            <div key={b.image}>
              <figure class='image is-rectangle'>
                <img src={b.image} alt='#' />
              </figure>
            </div>
          ))}
        </div>
        <div class='column is-half'>
          <section class='section has-text-centered is-medium'>
            <p class='is-size-2'>Cena: {fromPlist.price} zł</p>
            <p class='is-size-5'>Sztuk na stanie: {fromPlist.stock}</p>
            <p class='is-size-5'>numer id: {fromPlist.id}</p>
            <button
              onClick={() => addHandler(fromPlist)}
              class='button is-primary'
            >
              dodaj do koszyka
            </button>
            <button
              onClick={() => removeHandler(fromPlist)}
              class='button is-danger'
            >
              usun z koszyka
            </button>
            {cartItems.map((item) => (
              <div>
                {item.id} oraz quant {item.quant}
              </div>
            ))}
            {}
          </section>
        </div>
        <div class='column box'>
          <h1 class='title'>{fromPlist.name}</h1>
          {fromPlist.category.map((b) => (
            <div key={b.name}>
              <p class='has-text-warning-dark'>{b.name}</p>
            </div>
          ))}
          <h2 class='subtitle'>{fromPlist.description}</h2>
        </div>
      </div>

      <section class='section is-medium mx-6'>
        <article class='media'>
          <div class='media-content'>
            <div class='field'>
              <p class='control'>
                <textarea
                  class='textarea'
                  value={body}
                  placeholder='Add a comment...'
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </p>
            </div>
            {error && <p class='has-text-centered has-text-danger'>{error}</p>}
            <nav class='level'>
              <div class='level-left'>
                <div class='level-item'>
                  <a class='button is-info' onClick={commentHandler}>
                    Submit
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </article>

        {comments.map((b) => (
          <article key={b.id} class='media'>
            <div class='media-content'>
              <div class='content'>
                <p>
                  <strong>{b.owner}</strong> <small>TODO date</small>
                  <br />
                  {b.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}

export default ProductPage
