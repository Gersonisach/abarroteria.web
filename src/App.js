import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CrearClientePage from './pages/Clientes/CrearClientePage';
import CreateUsuarioPage from './pages/Usuario/CreateUsuarioPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import PrivateRoute from './components/PrivateRoute';
import PageCustomizable from './components/PageCustomizable';

function App() {
  const dataProveedor = { id_proveedor: '', nombre_comercial: '', nombre_representante: '', apellido_representante: '', nit: '', pais_origen: '', telefono: '', direccion: '', correo_electronico: '' }
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
  const columnsProveedor = [
    { id: 0, label: 'ID', minWidth: 170 },
    { id: 1, label: 'Nombre Comercial', minWidth: 170 },
    { id: 2, label: 'Nombre Representante', minWidth: 170 },
    { id: 3, label: 'Apellido Representante', minWidth: 170 },
    { id: 4, label: 'NIT', minWidth: 170 },
    { id: 5, label: 'Pais Origen', minWidth: 170 },
    { id: 6, label: 'Teléfono', minWidth: 170 },
    { id: 7, label: 'Dirección', minWidth: 170 },
    { id: 8, label: 'Correo Electrónico', minWidth: 170 }
  ];

  const dataOrdenCompra = { id_orden_compra:'', id_proveedor: '', fecha_orden:'', id_producto: '', cantidad: '' };
  const fieldsOrdenCompra = [
    { label: 'ID Proveedor', key: 'id_proveedor' },
    { label: 'ID Producto', key: 'id_producto' },
    { label: 'Cantidad', key: 'cantidad' }
  ];

  const columnsOrdenCompra = [
    { id: 0, label: 'ID', minWidth: 170 },
    { id: 1, label: 'ID Proveedor', minWidth: 170 },
    { id: 2, label: 'ID Producto', minWidth: 170 },
    { id: 3, label: 'Cantidad', minWidth: 170 }
  ];

  const dataCliente = { 
    id_cliente:'',
    nombre: '', 
    apellido: '', 
    nit: '', 
    pais_origen: '', 
    telefono: '', 
    direccion_entrega: '', 
    correo_electronico: '', 
    numero_tarjeta_credito: '',
    contraseña: '', 
  };
  
  const fieldsCliente = [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Apellido', key: 'apellido' },
    { label: 'NIT', key: 'nit' },
    { label: 'Pais de Origen', key: 'pais_origen' },
    { label: 'Teléfono', key: 'telefono' },
    { label: 'Dirección de Entrega', key: 'direccion_entrega' },
    { label: 'Correo Electrónico', key: 'correo_electronico' },
    { label: 'Número de Tarjeta de Crédito', key: 'numero_tarjeta_credito' },
    { label: 'Contraseña', key: 'contraseña' },
  ];
  
  const columnsCliente = [
    { id: 0, label: 'ID', minWidth: 170 },
    { id: 1, label: 'Nombre', minWidth: 170 },
    { id: 2, label: 'Apellido', minWidth: 170 },
    { id: 3, label: 'NIT', minWidth: 170 },
    { id: 4, label: 'Pais de Origen', minWidth: 170 },
    { id: 5, label: 'Teléfono', minWidth: 170 },
    { id: 6, label: 'Dirección de Entrega', minWidth: 170 },
    { id: 7, label: 'Correo Electrónico', minWidth: 170 },
    { id: 8, label: 'Número de Tarjeta de Crédito', minWidth: 170 }
  ];

  const dataTipoProducto = { 
    id_tipo_producto: '', 
    nombre_tipo_producto: ''
  };
  
  const fieldsTipoProducto = [
    { label: 'Nombre Tipo Producto', key: 'nombre_tipo_producto' }
  ];
  
  const columnsTipoProducto = [
    { id: 0, label: 'ID Tipo Producto', minWidth: 170 },
    { id: 1, label: 'Nombre Tipo Producto', minWidth: 170 }
  ];

  const dataProducto = { 
    id_producto: '', 
    codigo_unico: '', 
    nombre: '', 
    descripcion: '', 
    id_tipo_producto: '', 
    unidad_medida: '',
    precio_venta:'',
    precio_compra:'',
    iva:'', 
    precio_sin_iva: '', 
    porcentaje_ganancia: '', 
    cantidad_existencia: '', 
    cantidad_reserva:'',
    cantidad_minima:'',
    cantidad_maxima:'',
    activo: '', 
    imagen_producto: '' 
  };
  
  const fieldsProducto = [
    { label: 'Código Único', key: 'codigo_unico' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'ID Tipo Producto', key: 'id_tipo_producto' },
    { label: 'Unidad Medida', key: 'unidad_medida' },
    { label: 'Precio sin IVA', key: 'precio_sin_iva' },
    { label: 'Porcentaje Ganancia', key: 'porcentaje_ganancia' },
    { label: 'Cantidad Existencia', key: 'cantidad_existencia' },
    { label: 'Activo', key: 'activo' },
    { label: 'Imagen Producto', key: 'imagen_producto' }
  ];
  
  const columnsProducto = [
    { id: 0, label: 'ID Producto', minWidth: 170 },
    { id: 1, label: 'Código Único', minWidth: 170 },
    { id: 2, label: 'Nombre', minWidth: 170 },
    { id: 3, label: 'Descripción', minWidth: 170 },
    { id: 4, label: 'ID Tipo Producto', minWidth: 170 },
    { id: 5, label: 'Unidad Medida', minWidth: 170 },
    { id: 6, label: 'Precio sin IVA', minWidth: 170 },
    { id: 7, label: 'Precio Venta', minWidth: 170 },
    { id: 8, label: 'Precio Compra', minWidth: 170 },
    { id: 9, label: 'IVA', minWidth: 170 },
    { id: 10, label: 'Porcentaje Ganancia', minWidth: 170 },
    { id: 11, label: 'Cantidad Existencia', minWidth: 170 },
    { id: 12, label: 'Cantidad Reserva', minWidth: 170 },
    { id: 13, label: 'Cantidad Mínima', minWidth: 170 },
    { id: 14, label: 'Cantidad Máxima', minWidth: 170 },
    { id: 15, label: 'Activo', minWidth: 170 },
    { id: 16, label: 'Imagen Producto', minWidth: 170 }
  ];
  
  const dataUsuario = { 
    id_usuario:'',
    correo: '', 
    clave: '', 
    nombre: '', 
    apellido: '', 
    tipoUsuario: '' 
  };
  
  const fieldsUsuario = [
    { label: 'Correo', key: 'correo' },
    { label: 'Clave', key: 'clave' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Apellido', key: 'apellido' },
    { label: 'Tipo de Usuario', key: 'tipoUsuario' }
  ];
  
  const columnsUsuario = [
    { id: 0, label: 'ID', minWidth: 170 },
    { id: 1, label: 'Correo', minWidth: 170 },
    { id: 2, label: 'Clave', minWidth: 170 },
    { id: 3, label: 'Nombre', minWidth: 170 },
    { id: 4, label: 'Apellido', minWidth: 170 },
    { id: 5, label: 'Tipo de Usuario', minWidth: 170 }
  ];

  const dataPedido = { 
    id_pedido: '', 
    id_usuario: '', 
    fecha_pedido:'',
    monto_total:'',
    estado_pedido:'',
    id_producto: '', 
    cantidad: '' 
  };
  
  const fieldsPedido = [
    { label: 'ID Usuario', key: 'id_usuario' },
    { label: 'ID Producto', key: 'id_producto' },
    { label: 'Cantidad', key: 'cantidad' }
  ];
  
  const columnsPedido = [
    { id: 0, label: 'ID Pedido', minWidth: 170 },
    { id: 1, label: 'ID Usuario', minWidth: 170 },
    { id: 2, label: 'Fecha Pedido', minWidth: 170 },
    { id: 3, label: 'Monto Total', minWidth: 170 },
    { id: 4, label: 'Estado Pedido', minWidth: 170 }
  ];

  const dataDetalleOrdenCompra = { 
    id_detalle_orden_compra: '', 
    id_orden_compra: '', 
    id_producto: '', 
    cantidad: '',
    precio_unitario: ''
  };
  
  const fieldsDetalleOrdenCompra = [
    { label: 'ID Orden Compra', key: 'id_orden_compra' },
    { label: 'ID Producto', key: 'id_producto' },
    { label: 'Cantidad', key: 'cantidad' },
    { label: 'Precio Unitario', key: 'precio_unitario' }
  ];
  
  const columnsDetalleOrdenCompra = [
    { id: 0, label: 'ID Detalle Orden Compra', minWidth: 170 },
    { id: 1, label: 'ID Orden Compra', minWidth: 170 },
    { id: 2, label: 'ID Producto', minWidth: 170 },
    { id: 3, label: 'Cantidad', minWidth: 170 },
    { id: 4, label: 'Precio Unitario', minWidth: 170 }
  ];

  const dataFactura = { 
    id_factura: '', 
    id_usuario: '', 
    id_pedido: '',
    fecha_factura:'',
  };
  
  const fieldsFactura = [
    { label: 'ID Factura', key: 'id_factura' },
    { label: 'ID Usuario', key: 'id_usuario' },
    { label: 'ID Pedido', key: 'id_pedido' }
  ];
  
  const columnsFactura = [
    { id: 0, label: 'ID Factura', minWidth: 170 },
    { id: 1, label: 'ID Usuario', minWidth: 170 },
    { id: 2, label: 'ID Pedido', minWidth: 170 },
    { id: 3, label: 'Fecha Factura', minWidth: 170 }
  ];
  
  const dataDetallePedido = { 
    id_detalle_pedido: '', 
    id_pedido: '', 
    id_producto: '', 
    cantidad: '', 
    precio_venta_unitario: ''
  };
  
  const fieldsDetallePedido = [
    { label: 'ID Pedido', key: 'id_pedido' },
    { label: 'ID Producto', key: 'id_producto' },
    { label: 'Cantidad', key: 'cantidad' },
    { label: 'Precio Venta Unitario', key: 'precio_venta_unitario' }
  ];
  
  const columnsDetallePedido = [
    { id: 0, label: 'ID Detalle Pedido', minWidth: 170 },
    { id: 1, label: 'ID Pedido', minWidth: 170 },
    { id: 2, label: 'ID Producto', minWidth: 170 },
    { id: 3, label: 'Cantidad', minWidth: 170 },
    { id: 4, label: 'Precio Venta Unitario', minWidth: 170 }
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
              <Route path="proveedor/crear" element={<PageCustomizable modo={'crear'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} />} />
              <Route path="proveedor/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} />} />
              <Route path="proveedor/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} />} />
              <Route path="proveedor/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} />} />
              <Route path="proveedor/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataProveedor} page={'Proveedor'} fields={fieldsProveedor} colums={columnsProveedor}/>} />
              
              <Route path="orden-compra/crear" element={<PageCustomizable modo={'crear'} data={dataOrdenCompra} page={'OrdenCompra'} fields={fieldsOrdenCompra} />} />
              <Route path="orden-compra/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataOrdenCompra} page={'OrdenCompra'} fields={fieldsOrdenCompra} />} />
              <Route path="orden-compra/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataOrdenCompra} page={'OrdenCompra'} fields={fieldsOrdenCompra} />} />
              <Route path="orden-compra/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataOrdenCompra} page={'OrdenCompra'} fields={fieldsOrdenCompra} />} />
              <Route path="orden-compra/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataOrdenCompra} page={'OrdenCompra'} fields={fieldsOrdenCompra} colums={columnsOrdenCompra}/>} />

              <Route path="cliente/crear" element={<PageCustomizable modo={'crear'} data={dataCliente} page={'Cliente'} fields={fieldsCliente} />} />
              <Route path="cliente/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataCliente} page={'Cliente'} fields={fieldsCliente} />} />
              <Route path="cliente/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataCliente} page={'Cliente'} fields={fieldsCliente} />} />
              <Route path="cliente/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataCliente} page={'Cliente'} fields={fieldsCliente} />} />
              <Route path="cliente/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataCliente} page={'Cliente'} fields={fieldsCliente} colums={columnsCliente}/>} />

              <Route path="tipo-producto/crear" element={<PageCustomizable modo={'crear'} data={dataTipoProducto} page={'TipoProducto'} fields={fieldsTipoProducto} />} />
              <Route path="tipo-producto/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataTipoProducto} page={'TipoProducto'} fields={fieldsTipoProducto} />} />
              <Route path="tipo-producto/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataTipoProducto} page={'TipoProducto'} fields={fieldsTipoProducto} />} />
              <Route path="tipo-producto/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataTipoProducto} page={'TipoProducto'} fields={fieldsTipoProducto} />} />
              <Route path="tipo-producto/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataTipoProducto} page={'TipoProducto'} fields={fieldsTipoProducto} colums={columnsTipoProducto}/>} />

              <Route path="producto/crear" element={<PageCustomizable modo={'crear'} data={dataProducto} page={'Producto'} fields={fieldsProducto} />} />
              <Route path="producto/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataProducto} page={'Producto'} fields={fieldsProducto} />} />
              <Route path="producto/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataProducto} page={'Producto'} fields={fieldsProducto} />} />
              <Route path="producto/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataProducto} page={'Producto'} fields={fieldsProducto} />} />
              <Route path="producto/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataProducto} page={'Producto'} fields={fieldsProducto} colums={columnsProducto}/>} />

              <Route path="usuario/crear" element={<PageCustomizable modo={'crear'} data={dataUsuario} page={'Usuario'} fields={fieldsUsuario} />} />
              <Route path="usuario/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataUsuario} page={'Usuario'} fields={fieldsUsuario} />} />
              <Route path="usuario/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataUsuario} page={'Usuario'} fields={fieldsUsuario} />} />
              <Route path="usuario/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataUsuario} page={'Usuario'} fields={fieldsUsuario} />} />
              <Route path="usuario/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataUsuario} page={'Usuario'} fields={fieldsUsuario} colums={columnsUsuario}/>} />

              <Route path="pedido/crear" element={<PageCustomizable modo={'crear'} data={dataPedido} page={'Pedido'} fields={fieldsPedido} />} />
              <Route path="pedido/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataPedido} page={'Pedido'} fields={fieldsPedido} />} />
              <Route path="pedido/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataPedido} page={'Pedido'} fields={fieldsPedido} />} />
              <Route path="pedido/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataPedido} page={'Pedido'} fields={fieldsPedido} />} />
              <Route path="pedido/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataPedido} page={'Pedido'} fields={fieldsPedido} colums={columnsPedido}/>} />

              <Route path="detalle-orden-compra/crear" element={<PageCustomizable modo={'crear'} data={dataDetalleOrdenCompra} page={'DetalleOrdenCompra'} fields={fieldsDetalleOrdenCompra} />} />
              <Route path="detalle-orden-compra/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataDetalleOrdenCompra} page={'DetalleOrdenCompra'} fields={fieldsDetalleOrdenCompra} />} />
              <Route path="detalle-orden-compra/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataDetalleOrdenCompra} page={'DetalleOrdenCompra'} fields={fieldsDetalleOrdenCompra} />} />
              <Route path="detalle-orden-compra/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataDetalleOrdenCompra} page={'DetalleOrdenCompra'} fields={fieldsDetalleOrdenCompra} />} />
              <Route path="detalle-orden-compra/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataDetalleOrdenCompra} page={'DetalleOrdenCompra'} fields={fieldsDetalleOrdenCompra} colums={columnsDetalleOrdenCompra}/>} />

              <Route path="Factura/crear" element={<PageCustomizable modo={'crear'} data={dataFactura} page={'Factura'} fields={fieldsFactura} />} />
              <Route path="Factura/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataFactura} page={'Factura'} fields={fieldsFactura} />} />
              <Route path="Factura/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataFactura} page={'Factura'} fields={fieldsFactura} />} />
              <Route path="Factura/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataFactura} page={'Factura'} fields={fieldsFactura} />} />
              <Route path="Factura/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataFactura} page={'Factura'} fields={fieldsFactura} colums={columnsFactura}/>} />

              <Route path="detalle-pedido/crear" element={<PageCustomizable modo={'crear'} data={dataDetallePedido} page={'DetallePedido'} fields={fieldsDetallePedido} />} />
              <Route path="detalle-pedido/actualizar" element={<PageCustomizable modo={'actualizar'} data={dataDetallePedido} page={'DetallePedido'} fields={fieldsDetallePedido} />} />
              <Route path="detalle-pedido/eliminar" element={<PageCustomizable modo={'eliminar'} data={dataDetallePedido} page={'DetallePedido'} fields={fieldsDetallePedido} />} />
              <Route path="detalle-pedido/buscaruno" element={<PageCustomizable modo={'buscaruno'} data={dataDetallePedido} page={'DetallePedido'} fields={fieldsDetallePedido} />} />
              <Route path="detalle-pedido/buscartodo" element={<PageCustomizable modo={'buscartodo'} data={dataDetallePedido} page={'DetallePedido'} fields={fieldsDetallePedido} colums={columnsDetallePedido}/>} />            
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

