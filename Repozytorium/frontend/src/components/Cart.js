import React from 'react'

function Cart(props) {
  const { cartItems, addHandler, removeHandler } = props
  const quantPrice = cartItems.reduce((a, c) => a + c.quant * c.price, 0)

  console.log(cartItems)

  return (
    <div class='section'>
      <div class='column is-half is-offset-one-quarter '>
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
        </div>

        <button
          onClick={() => alert('przejscie do platnosci')}
          class='button is-info mr-1'
        >
          przejście do płatności
        </button>
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
  )
}

export default Cart

// <button onClick={()=>{localStorage.removeItem("cartItems")}} class="button is-danger">usun cookies</button>
