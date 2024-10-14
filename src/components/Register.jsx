import React from 'react'
import '../assets/style/register.scss'

const Register = () => {
  return (
    <form className='registerForm'>
      <h2>REGISTER</h2>
      <input type="text" placeholder='ENTER YOUR NAME'/>
      <input type="text" placeholder='ENTER YOUR SURNAME'/>
      <input type="text" placeholder='ENTER YOUR E-MAIL'/>
      <input type="password" placeholder='ENTER YOUR PASSWORD'/>
      <input type="file" id="fileUpload" name="photo" accept="image/*"/>
      <input type="submit" value={"Register"} />
    </form>
  )
}

export default Register