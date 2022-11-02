import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { Navigate, Link } from "react-router-dom";
import axios from "axios"

function Login(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  
  /*fetch('http://localhost:8000/auth/',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        username: "admin",
        password: "admin"
    })
})
    .then(res=>res.json())
    .then(json=>console.log(json))
*/

const loginHandler =()=>{
  setError("")
  axios.post('http://localhost:8000/auth/',{
      username: username,
      password: password
  })
  .then(res=>{
  console.log(res.data.token)
  props.settoken(res.data.token)
  localStorage.setItem("userToken",res.data.token)
}).catch(error=>{
  console.log(error.response.data.non_field_errors)
  setError(error.response.data.non_field_errors)

})

}



return (
    <section class="section is-large" >
     {props.token && <Navigate to="/" state={{amogus:"sus"}}replace={true} />}
      <div class="column is-half is-offset-one-quarter">
<p>{props.token}</p>
    <div class="field">
  <p class="control ">
    <input class="input" type="name" placeholder="Username"
      value={username}
      onChange={(e)=>setUsername(e.target.value)} />
   
    
  </p>
</div>
<div class="field">
  <p class="control ">
    <input class="input" type="password" placeholder="Password" 
      value={password}
      onChange={(e)=>setPassword(e.target.value)} />          
  </p>
  {error && <p class="has-text-centered has-text-danger">{error}</p>}
</div>
<div class="field">
  <p class="control">
    <button class="button is-success mr-2" onClick={loginHandler}>
      Login
    </button>
    
    <Link to={"/register"} state={{ data: "abc" }}>
      <button class="button is-info">
        Register
      </button>
    </Link>
    
  </p>
</div>
</div>
</section>
  )
}

export default Login