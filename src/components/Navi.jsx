import React from 'react';
import '../assets/style/navi.scss';
import Brand from '../assets/img/pngwing.com (1).png'; 
import { NavLink, Outlet } from 'react-router-dom';

const Navi = () => {
  return (
    <>
     <div className="header">
        <img src={Brand} alt='TUNE IN' className="brand-logo" />
        <h1>TUNE IN</h1>
      </div>
      
      <nav>
        <NavLink to="home">Home</NavLink>
        <NavLink to="login">Login</NavLink>
        <NavLink to="register">Register</NavLink>
        <div className="animation start-home"></div>
      </nav>
      <Outlet/>
    </>
 
  );
};

export default Navi;
