import React, { useContext } from 'react';
import '../assets/style/navi.scss';
import Brand from '../assets/img/pngwing.com (1).png'; 
import { NavLink, Outlet } from 'react-router-dom';
import DataContext from '../context/DataContext';

const Navi = () => {
  const {selectedMusic} = useContext(DataContext);
  const isMusicSelected = selectedMusic ? true : false; 

  return (
    <>
     <div className="header">
        <img src={Brand} alt='TUNE IN' className="brand-logo" />
        <h1>TUNE IN</h1>
      </div>
      
      <nav>
        <NavLink 
          to="home" 
          className={isMusicSelected ? 'disabled' : ''} 
          onClick={isMusicSelected ? (e) => e.preventDefault() : null}
        >
          Home
        </NavLink>
        <NavLink 
          to="login" 
          className={isMusicSelected ? 'disabled' : ''} 
          onClick={isMusicSelected ? (e) => e.preventDefault() : null}
        >
          Login
        </NavLink>
        <NavLink 
          to="register" 
          className={isMusicSelected ? 'disabled' : ''} 
          onClick={isMusicSelected ? (e) => e.preventDefault() : null}
        >
          Register
        </NavLink>
        <div className="animation start-home"></div>
      </nav>
      <Outlet/>
    </>
 
  );
};

export default Navi;
