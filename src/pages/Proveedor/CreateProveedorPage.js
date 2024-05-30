import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../../components/controls/Box';
import BoxMain from '../../components/controls/BoxMain';
import Form from '../../components/controls/Form';
import TextField from '../../components/controls/TextField';
import Button from '../../components/controls/Button';
import ButtonCancel from '../../components/controls/ButtonCancel';
import TitleLeft from '../../components/controls/TitleLeft';
import '../../components/styles/BackgroudImagen.css'
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateProveedorPage = () => {
    const [dataProveedor, setDataProveedor] = useState({nombre_comercial:'', nombre_representante:'', apellido_representante:'', nit:'', pais_origen:'', telefono:'', direccion:'', correo_electronico:''});
    const navigate = useNavigate();

    const handleOnClickCrear = async () => {

        try {
            const response = await axios.post('http://localhost:5000/proveedor/create', { ...dataProveedor });

            if (response.data.code) {
                Swal.fire({
                    title: '¡Error al crear proveedor!',
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
                title: '¡Proveedor creado correctamente!',
                text: 'Proceso fue satisfactorio.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'orange',
                showCancelButton: false,
                showCloseButton: false,
            });

            setDataProveedor({nombre_comercial:'', nombre_representante:'', apellido_representante:'', nit:'', pais_origen:'', telefono:'', direccion:'', correo_electronico:''});

        } catch (error) {
            console.log("🚀 ~ handleOnClickCrear ~ error:", error)
        }
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'}>
                <TitleLeft>Crear Proveedor</TitleLeft>
                <Form sx={{ display: 'grid', gridTemplateColumns: '300px 300px 300px', gridTemplateRows: '70px 70px 70px' }}>
                    <TextField
                        label="Nombre Comercial"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.nombre_comercial}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, nombre_comercial: e.target.value })}
                    />
                    <TextField
                        label="Nombre Representante"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.nombre_representante}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, nombre_representante: e.target.value })}
                    />
                    <TextField
                        label="Apellido Representante"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.apellido_representante}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, apellido_representante: e.target.value })}
                    />
                    <TextField
                        label="NIT"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.nit}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, nit: e.target.value })}
                    />
                    <TextField
                        label="Pais Origen"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.pais_origen}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, pais_origen: e.target.value })}
                    />
                    <TextField
                        label="Teléfono"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.telefono}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, telefono: e.target.value })}
                    />
                    <TextField
                        label="Dirección"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.direccion}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, direccion: e.target.value })}
                    />
                    <TextField
                        label="Correo Electrónico"
                        variant='outlined'
                        color='error'
                        value={dataProveedor.correo_electronico}
                        onChange={(e) => setDataProveedor({ ...dataProveedor, correo_electronico: e.target.value })}
                    />
                </Form>
                <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                    <Button variant='contained' width='40%' onClick={handleOnClickCrear}>
                        Crear Proveedor
                    </Button>
                    <ButtonCancel variant='contained' width='40%' onClick={() => navigate('/')}>
                        Cancelar
                    </ButtonCancel>
                </Box>

            </Box>
        </BoxMain>
    );
};

export default CreateProveedorPage;