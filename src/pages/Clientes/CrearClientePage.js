import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '../../components/controls/Box';
import BoxMain from '../../components/controls/BoxMain';
import Form from '../../components/controls/Form';
import TextField from '../../components/controls/TextField';
import Button from '../../components/controls/Button';
import ButtonCancel from '../../components/controls/ButtonCancel';
import TitleLeft from '../../components/controls/TitleLeft';
import Swal from 'sweetalert2';
import '../../components/styles/BackgroudImagen.css'

const CrearClientePage = () => {
    const [dataClienteCreate, setDataClienteCreate] = useState({ clienteId: '', nombre: '', apellido: '', nit: '', paisOrigen: '', telefono: '', direccionEntrega: '', correo: '', noTarjetaCredito: '' });
    const navigate = useNavigate();

    const handleOnClickCrear = async () => {

        try {
            const response = await axios.post('http://localhost:5000/clientescreate', {...dataClienteCreate});
            
            if(response.data.code){
                Swal.fire({
                    title: '¡Error al crear usuario!',
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
                title: '¡Usuario creado correctamente!',
                text: 'Ya puede iniciar sesión con correo y contraseña creados.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'orange',
                showCancelButton: false,
                showCloseButton: false,
              });

              setDataClienteCreate({ clienteId: '', nombre: '', apellido: '', nit: '', paisOrigen: '', telefono: '', direccionEntrega: '', correo: '', noTarjetaCredito: '' });
              
        } catch (error) {
           console.log("🚀 ~ handleOnClickCrear ~ error:", error)
        }
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'}>
                <TitleLeft>Crear Usuario de Cliente</TitleLeft>
                <Form sx={{ display: 'grid', gridTemplateColumns: '300px 300px 300px', gridTemplateRows: '70px 70px 70px' }}>
                    <TextField
                        name="clienteId"
                        label="Id de Cliente"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.clienteId}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, clienteId: e.target.value })}
                    />
                    <TextField
                        name="nombre"
                        label="Nombre"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.nombre}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, nombre: e.target.value })}
                    />
                    <TextField
                        name="apellido"
                        label="Apellido"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.apellido}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, apellido: e.target.value })}
                    />
                    <TextField
                        name="nit"
                        label="NIT"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.nit}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, nit: e.target.value })}
                    />
                    <TextField
                        name="paisOrigen"
                        label="Pais Origen"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.paisOrigen}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, paisOrigen: e.target.value })}
                    />
                    <TextField
                        name="telefono"
                        label="Telefono"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.telefono}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, telefono: e.target.value })}
                    />
                    <TextField
                        name="direccionEntrega"
                        label="Direccion Entrega"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.direccionEntrega}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, direccionEntrega: e.target.value })}
                    />
                    <TextField
                        name="correo"
                        label="Correo Electronico"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.correo}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, correo: e.target.value })}
                    />
                    <TextField
                        name="noTarjetaCredito"
                        label="Numnero de Tarjeta de Credito"
                        variant='outlined'
                        color='error'
                        value={dataClienteCreate.noTarjetaCredito}
                        onChange={(e) => setDataClienteCreate({ ...dataClienteCreate, noTarjetaCredito: e.target.value })}
                    />
                </Form>
                <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                    <Button variant='contained' width='40%' onClick={handleOnClickCrear}>
                        Crear Usuario
                    </Button>
                    <ButtonCancel variant='contained' width='40%' onClick={() => navigate('/login')}>
                        Cancelar
                    </ButtonCancel>
                </Box>

            </Box>
        </BoxMain>
    );
};

export default CrearClientePage;