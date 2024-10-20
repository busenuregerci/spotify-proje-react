import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Olmalısınız!',
      text: 'Login olmadan müzik ekleyemezsiniz.',
      showConfirmButton: true,
    });

    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;
