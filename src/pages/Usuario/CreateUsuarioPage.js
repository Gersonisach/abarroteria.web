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

const CreateUsuarioPage = () => {
    const [dataAdministrador, setDataAdministrador] = useState({ usuarioAdmin: '', passwordAdmin: ''});
    const [dataAdminCreate, setDataAdminCreate] = useState({correo: '', claveUser: '', nombre: '', apellido: '', tipoUsuario: ''});
    const navigate = useNavigate();

    const handleOnClickCrear = async () => {

        try {

            const response1 = await axios.get('http://localhost:5000/clientes', { params: dataAdminCreate.correo });

            if (response1.data.code) {
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

            const response = await axios.post('http://localhost:5000/usuariocreate', {...dataAdminCreate});
            
            if(response.data.code){
                Swal.fire({
                    title: '¡Error al crear usuario admin!',
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

              setDataAdminCreate({correo: '', claveUser: '', nombre: '', apellido: '', tipoUsuario: ''});
              
        } catch (error) {
           console.log("🚀 ~ handleOnClickCrear ~ error:", error)
        }
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'}>
                <TitleLeft>Crear Usuario de Admin</TitleLeft>
                <Form sx={{ display: 'grid', gridTemplateColumns: '300px 300px 300px', gridTemplateRows: '70px 70px 70px' }}>
                    <TextField
                        name="usuarioAdmin"
                        label="Correo de Administrador"
                        variant='outlined'
                        color='error'
                        value={dataAdministrador.usuarioAdmin}
                        onChange={(e) => setDataAdministrador({ ...dataAdminCreate, usuarioAdmin: e.target.value })}
                    />
                    <TextField
                        name="passwordAdmin"
                        label="Contraseña de Administrador"
                        variant='outlined'
                        color='error'
                        type='password'
                        value={dataAdministrador.passwordAdmin}
                        onChange={(e) => setDataAdministrador({ ...dataAdminCreate, passwordAdmin: e.target.value })}
                    />
                    <TextField
                        name="correo"
                        label="Correo Nuevo Usuario"
                        variant='outlined'
                        color='error'
                        value={dataAdminCreate.correo}
                        onChange={(e) => setDataAdminCreate({ ...dataAdminCreate, correo: e.target.value })}
                    />
                    <TextField
                        name="claveUser"
                        label="Contraseña Nuevo Usuario"
                        variant='outlined'
                        color='error'
                        type='password'
                        value={dataAdminCreate.claveUser}
                        onChange={(e) => setDataAdminCreate({ ...dataAdminCreate, claveUser: e.target.value })}
                    />
                    <TextField
                        name="nombre"
                        label="Nombre Nuevo Usuario"
                        variant='outlined'
                        color='error'
                        value={dataAdminCreate.nombre}
                        onChange={(e) => setDataAdminCreate({ ...dataAdminCreate, nombre: e.target.value })}
                    />
                    <TextField
                        name="apellido"
                        label="Apellido Nuevo Usuario"
                        variant='outlined'
                        color='error'
                        value={dataAdminCreate.apellido}
                        onChange={(e) => setDataAdminCreate({ ...dataAdminCreate, apellido: e.target.value })}
                    />
                    <TextField
                        name="tipoUsuario"
                        label="Tipo Usuario"
                        variant='outlined'
                        color='error'
                        value={dataAdminCreate.tipoUsuario}
                        onChange={(e) => setDataAdminCreate({ ...dataAdminCreate, tipoUsuario: e.target.value })}
                    />
                </Form>
                <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                    <Button variant='contained' width='40%' onClick={handleOnClickCrear}>
                        Crear Usuario
                    </Button>
                    <ButtonCancel variant='contained' width='40%' onClick={()=> navigate('/login')}>
                        Cancelar
                    </ButtonCancel>
                </Box>

            </Box>
        </BoxMain>
    );
};

export default CreateUsuarioPage;