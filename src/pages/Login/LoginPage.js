import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../../components/controls/Box';
import BoxMain from '../../components/controls/BoxMain';
import Form from '../../components/controls/Form';
import TextField from '../../components/controls/TextField';
import Button from '../../components/controls/Button';
import ButtonCancel from '../../components/controls/ButtonCancel';
import Title from '../../components/controls/Title';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Login/LoginPage.css'
import '../../components/styles/BackgroudImagen.css'

const LoginPage = () => {
    const [loginCliente, setLoginCliente] = useState(true);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        setCorreo('');
        setPassword('');
        // eslint-disable-next-line
    },[loginCliente])

    const handleOnClickLogin = () => { setLoginCliente(!loginCliente);};

    const handleOnClickIngresar = async () => {

        try {
            const response = await axios.get('http://localhost:5000/usuario', { params: { correo } });

            if (response.data.rows.length === 0) {
                Swal.fire({
                    title: '¡Error al obtener datos de usuario!',
                    html: `No existe ningún usuario con correo electrónico ingresado.`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'orange',
                    showCancelButton: false,
                    showCloseButton: false,
                });
                return;
            }

            const respuesta = response.data.rows[0];
            const password1 = respuesta[2];

            if(password1 !== password){
                Swal.fire({
                    title: '¡Contraseña Incorrecta!',
                    html: `Verifique que contraseña sea la correcta.`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'orange',
                    showCancelButton: false,
                    showCloseButton: false,
                });
                return;
            }

            const idUser = respuesta[0];
            const correo1 = respuesta[1];
            const nombre = respuesta[3];
            const apellido = respuesta[4];
            const tipoUsuario = respuesta[5];

            const dataUser = {idUser, correo1, nombre, apellido, tipoUsuario}
            
            setCorreo('');
            setPassword('');
            login(dataUser);
            navigate("/");

        } catch (error) {
            console.log("🚀 ~ handleOnClickIngresar ~ error:", error)
        }
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box width='60%' height='70%'>
                <Form id="form-sin-imagen" flex='1' className={loginCliente ? 'form-sin-imagen-left' : 'form-sin-imagen-right'}>
                    <Title>{loginCliente ? "Login Cliente" : "Login Administrador"}</Title>
                    <TextField
                        name="correo"
                        label="Correo"
                        variant='outlined'
                        color='error'
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <TextField
                        name="password"
                        label="Contraseña"
                        variant='outlined'
                        type='password'
                        color='error'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='contained' onClick={handleOnClickIngresar}>
                        Ingresar
                    </Button>
                    <ButtonCancel variant='contained' onClick={()=> loginCliente ? navigate('/create-user-cliente') : navigate('/create-user-admin')}>
                        Crear Cuenta
                    </ButtonCancel>
                </Form>
                <Form id='form-con-imagen' flex='1' className={loginCliente ? 'form-con-imagen-right': 'form-con-imagen-left'}>
                    <Button variant='contained' borderRadius='30px' width='250px' onClick={handleOnClickLogin}>
                        {loginCliente ? "Login Administrador" : "Login Cliente"}
                    </Button>
                </Form>
            </Box>
        </BoxMain>
    );
};

export default LoginPage;

