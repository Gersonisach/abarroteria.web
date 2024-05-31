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
  if (userData.tipoUsuario === 'comprador') {
    if (tipoUsuarioPermitido !== 'comprador') {
      return <Navigate to="/acceso-no-autorizado" />;
    }
    return <Outlet />;
  }

  // Si el tipo de usuario es "administrador", permite el acceso a todas las rutas
  if (userData.tipoUsuario === 'administrador') {
    return <Outlet />;
  }

  // Si el tipo de usuario es "bodeguero", verifica las rutas permitidas para bodegueros
  if (userData.tipoUsuario === 'bodeguero') {
    if (tipoUsuarioPermitido !== 'bodeguero') {
      return <Navigate to="/acceso-no-autorizado" />;
    }
    return <Outlet />;
  }

  // Si el tipo de usuario no coincide con ninguno de los permitidos, redirige a una página de acceso no autorizado
  return <Navigate to="/acceso-no-autorizado" />;
}

export default PrivateRoute;
