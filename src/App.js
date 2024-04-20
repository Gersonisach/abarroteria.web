import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CrearClientePage from './pages/Clientes/CrearClientePage';
import CreateUsuarioPage from './pages/Usuario/CreateUsuarioPage';
import CreateDetalleOrdenCompraPage from './pages/DetalleOrdenCompra/CreateDetalleOrdenCompraPage';
import CreateDetallePedidoPage from './pages/DetallePedido/CreateDetallePedidoPage';
import CreateFacturaPage from './pages/Factura/CreateFacturaPage';
import CreateOrdenCompraPage from './pages/OrdenCompra/CreateOrdenCompraPage';
import CreatePedidoPage from './pages/Pedido/CreatePedidoPage';
import CreateProductoPage from './pages/Producto/CreateProductoPage';
import CreateProveedorPage from './pages/Proveedor/CreateProveedorPage';
import CreateTipoProductoPage from './pages/TipoProducto/CreateTipoProductoPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-user-cliente" element={<CrearClientePage />} />
          <Route path="/create-user-admin" element={<CreateUsuarioPage />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path="/" element={<LayoutPage />}>
              <Route index element={<HomePage />} />
              <Route path="create-detalle-orden-compra" element={<CreateDetalleOrdenCompraPage />} />
              <Route path="create-detalle-pedido" element={<CreateDetallePedidoPage />} />
              <Route path="create-factura" element={<CreateFacturaPage />} />
              <Route path="create-orden-compra" element={<CreateOrdenCompraPage />} />
              <Route path="create-pedido" element={<CreatePedidoPage />} />
              <Route path="create-producto" element={<CreateProductoPage />} />
              <Route path="create-proveedor" element={<CreateProveedorPage />} />
              <Route path="create-tipo-producto" element={<CreateTipoProductoPage />} />
              
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

