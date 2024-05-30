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
import PageCustomizable from './components/PageCustomizable';

function App() {
  const dataProveedor = {id:'', nombre_comercial:'', nombre_representante:'', apellido_representante:'', nit:'', pais_origen:'', telefono:'', direccion:'', correo_electronico:''}
  const fieldsProveedor = [
    { label: 'Nombre Comercial', key: 'nombre_comercial' },
    { label: 'Nombre Representante', key: 'nombre_representante' },
    { label: 'Apellido Representante', key: 'apellido_representante' },
    { label: 'NIT', key: 'nit' },
    { label: 'Pais Origen', key: 'pais_origen' },
    { label: 'Teléfono', key: 'telefono' },
    { label: 'Dirección', key: 'direccion' },
    { label: 'Correo Electrónico', key: 'correo_electronico' },
];


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
              <Route path="detalle-orden-compra" element={<CreateDetalleOrdenCompraPage />} />
              <Route path="detalle-pedido" element={<CreateDetallePedidoPage />} />
              <Route path="factura" element={<CreateFacturaPage />} />
              <Route path="orden-compra" element={<CreateOrdenCompraPage />} />
              <Route path="pedido" element={<CreatePedidoPage />} />
              <Route path="producto" element={<CreateProductoPage />} />
              <Route path="tipo-producto" element={<CreateTipoProductoPage />} />
              <Route path="proveedor/crear" element={<PageCustomizable modo={'crear'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} />} />
              <Route path="proveedor/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

