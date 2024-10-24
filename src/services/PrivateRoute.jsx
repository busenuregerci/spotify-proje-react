import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  
  const {user} = useSelector(state => state.auth)

  if (!user) {
    Swal.fire({
      icon: 'warning',
      title: 'You must log in!',
      text: 'You cannot add music without logging in.',
      showConfirmButton: true,
    });

    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;
