import React, {  useState } from 'react';
import '../assets/style/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import 'animate.css';
import { login } from '../firebase';
import { Toaster } from 'react-hot-toast';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    console.log(user)
    navigate("/home", {
      replace: true
    })
  };

 
  return (
    <>
     <form onSubmit={handleLogin} className='loginForm'>
      <h2>LOGIN</h2>
      <input className='username' value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder='ENTER YOUR E-MAIL' />
      <input className='password' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='ENTER YOUR PASSWORD' />
      <input type="submit" value={"LOGIN"} />
      <Link to="/home">Continue without Login!</Link>
    </form>
    <Toaster/>
    </>
   
  );
};

export default Login;
