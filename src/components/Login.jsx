import React from 'react'
import '../assets/style/login.scss'

const Login = () => {
  return (
    <form className='loginForm'>
    <h2>LOGIN</h2>
    <input type="text" placeholder='ENTER YOUR E-MAIL'/>
    <input type="password" placeholder='ENTER YOUR PASSWORD'/>
    <input type="submit" value={"LOGIN"} />
  </form>
  )
}

export default Login