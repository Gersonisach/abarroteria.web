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

const ActualizarClientePage = () => {
    const [dataCliente, setDataCliente] = useState({ clienteId: '', nombre: '', apellido: '', nit: '', paisOrigen: '', telefono: '', direccionEntrega: '', correo: '', noTarjetaCredito: '' });
    const navigate = useNavigate();

    const handleOnClickCrear = async () => {

        try {
            const response = await axios.post('http://localhost:5000//cliente/update', {...dataCliente});
            
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

              setDataCliente({ clienteId: '', nombre: '', apellido: '', nit: '', paisOrigen: '', telefono: '', direccionEntrega: '', correo: '', noTarjetaCredito: '' });
              
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
                        value={dataCliente.clienteId}
                        onChange={(e) => setDataCliente({ ...dataCliente, clienteId: e.target.value })}
                    />
                    <TextField
                        name="nombre"
                        label="Nombre"
                        variant='outlined'
                        color='error'
                        value={dataCliente.nombre}
                        onChange={(e) => setDataCliente({ ...dataCliente, nombre: e.target.value })}
                    />
                    <TextField
                        name="apellido"
                        label="Apellido"
                        variant='outlined'
                        color='error'
                        value={dataCliente.apellido}
                        onChange={(e) => setDataCliente({ ...dataCliente, apellido: e.target.value })}
                    />
                    <TextField
                        name="nit"
                        label="NIT"
                        variant='outlined'
                        color='error'
                        value={dataCliente.nit}
                        onChange={(e) => setDataCliente({ ...dataCliente, nit: e.target.value })}
                    />
                    <TextField
                        name="paisOrigen"
                        label="Pais Origen"
                        variant='outlined'
                        color='error'
                        value={dataCliente.paisOrigen}
                        onChange={(e) => setDataCliente({ ...dataCliente, paisOrigen: e.target.value })}
                    />
                    <TextField
                        name="telefono"
                        label="Telefono"
                        variant='outlined'
                        color='error'
                        value={dataCliente.telefono}
                        onChange={(e) => setDataCliente({ ...dataCliente, telefono: e.target.value })}
                    />
                    <TextField
                        name="direccionEntrega"
                        label="Direccion Entrega"
                        variant='outlined'
                        color='error'
                        value={dataCliente.direccionEntrega}
                        onChange={(e) => setDataCliente({ ...dataCliente, direccionEntrega: e.target.value })}
                    />
                    <TextField
                        name="correo"
                        label="Correo Electronico"
                        variant='outlined'
                        color='error'
                        value={dataCliente.correo}
                        onChange={(e) => setDataCliente({ ...dataCliente, correo: e.target.value })}
                    />
                    <TextField
                        name="noTarjetaCredito"
                        label="Numnero de Tarjeta de Credito"
                        variant='outlined'
                        color='error'
                        value={dataCliente.noTarjetaCredito}
                        onChange={(e) => setDataCliente({ ...dataCliente, noTarjetaCredito: e.target.value })}
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

export default ActualizarClientePage;