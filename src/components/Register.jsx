import React, { useState } from 'react'
import '../assets/style/register.scss'
import { register } from '../firebase'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
      e.preventDefault();
  
      const displayName = name + " " + surname;
  
      try {
          const user = await register(email, password, displayName);
  
          if (user) {
              let timerInterval;
  
              Swal.fire({
                  title: "Registration successful!",
                  html: "Redirecting home page in <b></b> milliseconds.",
                  timer: 3000,  
                  timerProgressBar: true,
                  didOpen: () => {
                      Swal.showLoading();
                      const b = Swal.getHtmlContainer().querySelector('b');
                      timerInterval = setInterval(() => {
                          b.textContent = Swal.getTimerLeft();  
                      }, 100);
                  },
                  willClose: () => {
                      clearInterval(timerInterval);  
                  }
              }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                      navigate('/home');  
                  }
              });
          }
      } catch (error) {
          Swal.fire({
              title: 'Oops!',
              text: 'Registration failed. Please try again.',
              icon: 'error'
          });
      }
  };
  


  return (
    <>
     <form className='registerForm' onSubmit={handleSubmit}>
      <h2>REGISTER</h2>
      <input value={name} onChange={e=> setName(e.target.value)} type="text" placeholder='ENTER YOUR NAME'/>
      <input value={surname} onChange={e=> setSurname(e.target.value)} type="text" placeholder='ENTER YOUR SURNAME'/>
      <input value={email} onChange={e=> setEmail(e.target.value)} type="text" placeholder='ENTER YOUR E-MAIL'/>
      <input value={password} onChange={e=> setPassword(e.target.value)} type="password" placeholder='ENTER YOUR PASSWORD'/>
      <input type="submit" value={"Register"} disabled={!name||!surname || !email|| !password} />
    </form>
    <Toaster/>
    </>
   
  )
}

export default Register