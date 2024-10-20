import React, { useContext, useState } from 'react';
import '../assets/style/login.scss';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2';
import 'animate.css';



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(username, password);
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     alert("Ooopss Login Failed!!"); 
  //     setPassword("");
  //     setUsername("");
  //   }
  // };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/home");
    } catch (error) {
      //alert("failed")
      // Swal.fire({
      //   title: "Test Alert",
      //   text: "This is a test alert",
      //   icon: "info"
      // });
      console.error("Login failed:", error); 
      //alert("Ooopss Login Failed!!");
      Swal.fire({
        title: "Oooppsss!! E-mail or password wrong!",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      setPassword("");
      setUsername("");
    }
  };

 
  return (
    <form onSubmit={handleLogin} className='loginForm'>
      <h2>LOGIN</h2>
      <input className='username' value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='ENTER YOUR E-MAIL' />
      <input className='password' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='ENTER YOUR PASSWORD' />
      <input type="submit" value={"LOGIN"} />
      <Link to="/home">Continue without Login!</Link>
    </form>
  );
};

export default Login;
