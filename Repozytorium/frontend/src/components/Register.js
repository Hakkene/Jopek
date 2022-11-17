import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'


function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')

  

  const loginHandler = () => {
    setError1('')
    setError2('')
    
    axios.post('http://127.0.0.1:8000/users/', {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      setError1(error.response.data.username)
      setError2(error.response.data.password)
      console.log(error.response.data);
      console.log(error.response.data.username);
      console.log(error.response.data.password);
    });
    
  }

  return (
    <section class='section is-large'>
            
      <div class='column is-half is-offset-one-quarter'>
        
        <p>Podaj swoje dane</p>
        <div class='field'>
          <p class='control '>
            <input
              class='input'
              type='name'
              placeholder='Login'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          {error1 && <p class='has-text-centered has-text-danger'>{error1}</p>}
        </div>
        <div class='field'>
          <p class='control '>
            <input
              class='input'
              type='password'
              placeholder='Hasło'
              value={password}
              onChange={(e) => setPassword(e.target.value) }
             
            />
          </p>
          {error2 && <p class='has-text-centered has-text-danger'>{error2}</p>}
        </div>
        <div class='field'>
          <p class='control'>
            <button class='button is-success mr-2' onClick={loginHandler}>
              Zarejestruj się
            </button>

            
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register

//<Navigate to='/' state={{ amogus: 'sus' }} replace={true} />


// headers: {
//   'content-type': 'multipart/form-data'
// },
// body:{
//   username: "user1",
//   password: "user1",
// }