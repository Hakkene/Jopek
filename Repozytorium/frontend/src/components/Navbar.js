import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiCart } from '@mdi/js'

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null)
  const logoutHandler = () => {
    setToken('')
    localStorage.clear()
  }

  return (
    <nav class='navbar' role='navigation' aria-label='main navigation'>
      <div class='navbar-brand'>
        <a class='navbar-item' href='/'>
          <img
            src='https://i1.sndcdn.com/artworks-Uii8SMJvNPxy8ePA-romBoQ-t500x500.jpg'
            width='112'
            height='28'
            alt='#'
          />
        </a>

        <a
          role='button'
          class='navbar-burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' class='navbar-menu'>
        <div class='navbar-start'>
          <a href='/cart' alt='test' class='navbar-item'>
            Cart
          </a>

          <a class='navbar-item'>Documentation</a>

          <div class='navbar-item has-dropdown is-hoverable'>
            <a class='navbar-link'>More</a>

            <div class='navbar-dropdown'>
              <a class='navbar-item'>About</a>
              <a class='navbar-item'>Jobs</a>
              <a class='navbar-item'>Contact</a>
              <hr class='navbar-divider' />
              <a class='navbar-item'>Report an issue</a>
            </div>
          </div>
        </div>

        <div class='navbar-end'>
          <div class='navbar-item'>
            <Link to='/cart'>
              <div class='mr-3'>
                <Icon path={mdiCart} title='User Profile' size={1.7} />
              </div>{' '}
            </Link>

            <div class='buttons'>
              {token ? (
                <button class='button is-danger' onClick={logoutHandler}>
                  Log out
                </button>
              ) : (
                <div>
                  <a href={'/register'} class='button is-primary'>
                    <strong>Register</strong>
                  </a>
                  <a href={'/login'} class='button is-light'>
                    Log in
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )

  //<a class="button is-danger" href="/login">
  //logout
  //</a>
  //<Link to={"/"+j.slug} state={{ data: j }}>
}

export default Navbar
