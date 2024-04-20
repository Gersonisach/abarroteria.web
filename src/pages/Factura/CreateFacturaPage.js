import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../../components/controls/Box';
import BoxMain from '../../components/controls/BoxMain';
import Form from '../../components/controls/Form';
import TextField from '../../components/controls/TextField';
import Button from '../../components/controls/Button';
import ButtonCancel from '../../components/controls/ButtonCancel';
import TitleLeft from '../../components/controls/TitleLeft';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../components/styles/BackgroudImagen.css'

const CreateFacturaPage = () => {
    const [dataDetalleOrdenCompra, setDataDetalleOrdenCompra] = useState({ idDetalleORdenCompra: '', idOrdenCompra: '', idProducto: '', cantidad: '', precioUnitario: '' });
    const navigate = useNavigate();

    const handleOnClickCrear = async () => {

        try {
            const response = await axios.post('http://localhost:5000/detalleordencompracreate', { ...dataDetalleOrdenCompra });

            if (response.data.code) {
                Swal.fire({
                    title: '¡Error al crear detalle orden de compra!',
                    html: `Se recibió error de la base de datos, código de error Oracle: <b>${response.data.code}</b>`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'orange',
                    showCancelButton: false,
                    showCloseButton: false,
                });
                return;
            }

            Swal.fire({
                title: '¡Detalle de orden de compra correctamente!',
                text: 'Proceso fue satisfactorio.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'orange',
                showCancelButton: false,
                showCloseButton: false,
            });

            setDataDetalleOrdenCompra({ idDetalleORdenCompra: '', idOrdenCompra: '', idProducto: '', cantidad: '', precioUnitario: '' });

        } catch (error) {
            console.log("🚀 ~ handleOnClickCrear ~ error:", error)
        }
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'}>
                <TitleLeft>Crear Factura</TitleLeft>
                <Form sx={{ display: 'grid', gridTemplateColumns: '300px 300px 300px', gridTemplateRows: '70px 70px 70px' }}>
                    <TextField
                        name="idDetalleORdenCompra"
                        label="Id Detalle Orden Compra"
                        variant='outlined'
                        color='error'
                        value={dataDetalleOrdenCompra.idDetalleORdenCompra}
                        onChange={(e) => setDataDetalleOrdenCompra({ ...dataDetalleOrdenCompra, idDetalleORdenCompra: e.target.value })}
                    />
                    <TextField
                        name="idOrdenCompra"
                        label="Id Orden Compra"
                        variant='outlined'
                        color='error'
                        value={dataDetalleOrdenCompra.idOrdenCompra}
                        onChange={(e) => setDataDetalleOrdenCompra({ ...dataDetalleOrdenCompra, idOrdenCompra: e.target.value })}
                    />
                    <TextField
                        name="idProducto"
                        label="Id Producto"
                        variant='outlined'
                        color='error'
                        value={dataDetalleOrdenCompra.idProducto}
                        onChange={(e) => setDataDetalleOrdenCompra({ ...dataDetalleOrdenCompra, idProducto: e.target.value })}
                    />
                    <TextField
                        name="cantidad"
                        label="Cantidad"
                        variant='outlined'
                        color='error'
                        value={dataDetalleOrdenCompra.cantidad}
                        onChange={(e) => setDataDetalleOrdenCompra({ ...dataDetalleOrdenCompra, cantidad: e.target.value })}
                    />
                    <TextField
                        name="precioUnitario"
                        label="Precio Unitario"
                        variant='outlined'
                        color='error'
                        value={dataDetalleOrdenCompra.precioUnitario}
                        onChange={(e) => setDataDetalleOrdenCompra({ ...dataDetalleOrdenCompra, precioUnitario: e.target.value })}
                    />
                </Form>
                <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                    <Button variant='contained' width='40%' onClick={handleOnClickCrear}>
                        Crear Detalle Orden Compra
                    </Button>
                    <ButtonCancel variant='contained' width='40%' onClick={() => navigate('/')}>
                        Cancelar
                    </ButtonCancel>
                </Box>

            </Box>
        </BoxMain>
    );
};

export default CreateFacturaPage;