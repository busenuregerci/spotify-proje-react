import React, { useContext } from 'react';
import '../assets/style/navi.scss';
import Brand from '../assets/img/pngwing.com (1).png'; 
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { useDispatch, useSelector } from 'react-redux';
import {logout } from "../firebase"
import {logout as logoutHandle} from "../store/auth"

const Navi = () => {
  const {selectedMusic} = useContext(DataContext);
  const {user} = useSelector(state => state.auth)
  const isMusicSelected = selectedMusic ? true : false; 
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogout= async ()=>{
   await logout();
   dispatch(logoutHandle())
    navigate("/login", {
      replace: true
    })
  }


  return (
    <>
    <div className="header">
      <img src={Brand} alt='TUNE IN' className="brand-logo" />
      <h1>TUNE IN</h1>
    </div>
    
    <nav>
      {user ? ( 
        <>
          <NavLink to="home" className={isMusicSelected ? 'disabled' : ''} onClick={isMusicSelected ? (e) => e.preventDefault() : null}>
            Home
          </NavLink>
          <NavLink to="musics" className={isMusicSelected ? 'disabled' : ''} onClick={isMusicSelected ? (e) => e.preventDefault() : null}>
            Musics
          </NavLink>
          <NavLink 
              to="#" 
              className={isMusicSelected ? 'disabled' : ''} 
              onClick={isMusicSelected ? (e) => e.preventDefault() : handleLogout} 
            >
              Logout
            </NavLink>
        </>
      ) : ( 
        <>
          <NavLink to="home" className={isMusicSelected ? 'disabled' : ''} onClick={isMusicSelected ? (e) => e.preventDefault() : null}>
            Home
          </NavLink>
          <NavLink to="login" className={isMusicSelected ? 'disabled' : ''} onClick={isMusicSelected ? (e) => e.preventDefault() : null}>
            Login
          </NavLink>
          <NavLink to="register" className={isMusicSelected ? 'disabled' : ''} onClick={isMusicSelected ? (e) => e.preventDefault() : null}>
            Register
          </NavLink>
        </>
      )}
      <div className="animation start-home"></div>
    </nav>
    <Outlet/>
  </>
 
  );
};

export default Navi;
