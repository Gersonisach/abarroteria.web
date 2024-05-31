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
import '../Login/LoginPage.css';
import '../../components/styles/BackgroudImagen.css';

const initialDataUser = {
    id_usuario: '',
    correo: '',
    clave: '',
    nombre: '',
    apellido: '',
    tipoUsuario: ''
};

const LoginPage = () => {
    const [dataUsuario, setDataUsuario] = useState(initialDataUser);
    const [loginCliente, setLoginCliente] = useState(true);
    const [loader, setLoader] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setDataUsuario(initialDataUser);
    }, [loginCliente]);

    const handleOnClickLogin = () => {
        setLoginCliente(!loginCliente);
    };

    const buscarUsuario = async () => {
        try {
            setLoader(true);

            const response = await axios.get(`http://localhost:5000/usuario/findbyid`, { params: { id: dataUsuario.correo } });
            const data = response.data;

            if (data && data.length > 0) {
                if(data[0][2] !== dataUsuario.clave?.trim()){
                    Swal.fire({
                        title: `¡Error!`,
                        html: `Contraseña ingresada no es válida`,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: 'orange',
                        showCancelButton: false,
                        showCloseButton: false,
                    });
                    return;
                }

                const mappedData = mapArrayToDataPage(data[0], initialDataUser);
                login(mappedData);
                navigate('/');

            } else {
                Swal.fire({
                    title: `¡No se encontró ningún usuario!`,
                    html: `No se encontraron usuarios con los datos ingresados`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'orange',
                    showCancelButton: false,
                    showCloseButton: false,
                });
            }

        } catch (error) {
            Swal.fire({
                title: `¡Error al obtener datos de usuario!`,
                html: `Se recibió un error de la base de datos, código de error Oracle: <b>${error.response?.data}</b>`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'orange',
                showCancelButton: false,
                showCloseButton: false,
            });
        } finally {
            setLoader(false);
        }
    };

    const mapArrayToDataPage = (array, dataUser) => {
        const updatedDataPage = { ...dataUser };
        Object.keys(updatedDataPage).forEach((key, index) => {
            updatedDataPage[key] = array[index] || '';
        });
        return updatedDataPage;
    };

    const handleChange = (e, key) => {
        setDataUsuario({ ...dataUsuario, [key]: e.target.value });
    };

    const handleOnClickIngresar = async (e) => {
        e.preventDefault();
        buscarUsuario();

    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box width='60%' height='70%'>
                <Form id="form-sin-imagen" flex='1' className={loginCliente ? 'form-sin-imagen-left' : 'form-sin-imagen-right'} onSubmit={(e)=> handleOnClickIngresar(e)}>
                    <Title>{loginCliente ? "Login Cliente" : "Login Administrador"}</Title>
                    <TextField
                        name="correo"
                        label="Correo"
                        variant='outlined'
                        color='error'
                        value={dataUsuario['correo']}
                        onChange={(e) => handleChange(e, 'correo')}
                    />
                    <TextField
                        name="clave"
                        label="Contraseña"
                        variant='outlined'
                        type='password'
                        color='error'
                        value={dataUsuario['clave']}
                        onChange={(e) => handleChange(e, 'clave')}
                    />
                    <Button variant='contained' type={'submit'} isLoading={loader}>
                        {loader ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                    {loginCliente &&
                        <ButtonCancel variant='contained' onClick={() => navigate('/cliente/crear')}>
                            Crear Cuenta
                        </ButtonCancel>
                    }
                </Form>
                <Form id='form-con-imagen' flex='1' className={loginCliente ? 'form-con-imagen-right' : 'form-con-imagen-left'}>
                    <Button variant='contained' borderRadius='30px' width='250px' onClick={handleOnClickLogin}>
                        {loginCliente ? "Login Administrador" : "Login Cliente"}
                    </Button>
                </Form>
            </Box>
        </BoxMain>
    );
};

export default LoginPage;

