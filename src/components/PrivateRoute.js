import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function PrivateRoute({ tipoUsuarioPermitido }) {
  const { isLoggedIn, userData } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Si el tipo de usuario es "comprador", verifica las rutas permitidas para compradores
  if (userData.tipoUsuario.toLowerCase() === 'comprador') {
    return <Outlet />;
  }
  else if (userData.tipoUsuario.toLowerCase() === 'bodeguero') {
    return <Outlet />;
  } 
  else if (userData.tipoUsuario.toLowerCase() === 'administrador') {
    return <Outlet />;
  }

  return <Navigate to="/acceso-no-autorizado" />;
}

export default PrivateRoute;
