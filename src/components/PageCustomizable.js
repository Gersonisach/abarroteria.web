import React, { useState, useEffect, useContext } from 'react';
import Box from './controls/Box';
import BoxMain from './controls/BoxMain';
import Form from './controls/Form';
import TextField from './controls/TextField';
import Button from './controls/Button';
import ButtonCancel from './controls/ButtonCancel';
import TitleLeft from './controls/TitleLeft';
import DataTable from './table/DataTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import './styles/BackgroudImagen.css'
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PageCustomizable = ({ modo, data, page, fields, colums, tieneCancelar, tieneFinalizar }) => {
    const [dataPage, setDataPage] = useState({ ...data });
    const [id, setId] = useState('');
    const [loader, setLoader] = useState(false);
    const [loaderBusqueda, setLoaderBusqueda] = useState(false);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const location = useLocation();
    const { pedidoId } = location.state || {};

    useEffect(() => {
        if (modo === 'buscartodo') {
            buscarTodo();
            return;
        }

        if (modo === 'actualizar' && page === 'Cliente' && userData.tipoUsuario.toLowerCase() === 'comprador') {
            setId(userData.correo);
            buscarUno(userData.correo);
            return;
        }

        if (page === 'Pedido' && userData.tipoUsuario.toLowerCase() === 'comprador') {
            setDataPage({ ...dataPage, id_usuario: userData.id_usuario, id_producto: pedidoId });
            return;
        }

        setDataPage({ ...data })
        setId('');
        // eslint-disable-next-line
    }, [modo, page]);

    const handleOnClickAccion = async (action) => {
        try {
            setLoader(true);
            let response;
            if (modo === 'crear') {
                response = await axios.post(`http://localhost:5000/${page}/create`, { ...dataPage });
            }
            else if (modo === 'actualizar' || action === 'actualizar') {
                response = await axios.post(`http://localhost:5000/${page}/update`, { ...dataPage });
            }
            else if (modo === 'eliminar' || action === 'eliminar') {
                response = await axios.post(`http://localhost:5000/${page}/delete`, { ...dataPage });
            }
            else if (modo === 'cancelar' || action === 'cancelar') {
                response = await axios.post(`http://localhost:5000/${page}/cancelar`, { ...dataPage });
            }
            else if (modo === 'finalizar' || action === 'finalizar') {
                response = await axios.post(`http://localhost:5000/${page}/finalizar`, { ...dataPage });
            }

            console.log(response)

            Swal.fire({
                title: `${page}`,
                text: 'Proceso fue satisfactorio.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue',
                showCancelButton: false,
                showCloseButton: false,
            });

            setDataPage({ ...data })
            setId('');
        } catch (error) {
            Swal.fire({
                title: `¡Error al ${modo} ${page}!`,
                html: `Se recibió error de la base de datos, código de error Oracle: <b>${error.response.data}</b>`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue',
                showCancelButton: false,
                showCloseButton: false,
            });
        }
        finally {
            setLoader(false);
        }
    };

    const buscarTodo = async () => {
        try {
            setLoader(true);

            let response;

            response = await axios.get(`http://localhost:5000/${page}/findall`);

            if (userData.tipoUsuario.toLowerCase() === 'comprador') {

                if (page === 'Pedido' || page === 'Factura') {
                    const filteredData = response.data.filter(item => item[1] === userData.id_usuario);
                    setRows(filteredData);
                }
                else if (page === 'DetallePedido') {
                    let response2 = await axios.get(`http://localhost:5000/pedido/findall`);
                    const pedidosUsuario = response2.data.filter(pedido => pedido[1] === userData.id_usuario).map(pedido => pedido[0]);

                    const filteredData = response.data.filter(detalle => pedidosUsuario.includes(detalle[1]));
                    setRows(filteredData);
                }
            }
            else {
                setRows(response.data);
            }



        } catch (error) {
            Swal.fire({
                title: `¡Error al ${modo} ${page}!`,
                html: `Se recibió error de la base de datos, código de error Oracle: <b>${error.response.data}</b>`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue',
                showCancelButton: false,
                showCloseButton: false,
            });
        }
        finally {
            setLoader(false);
        }
    };

    const buscarUno = async (id) => {
        try {
            setLoaderBusqueda(true);

            let response;

            response = await axios.get(`http://localhost:5000/${page}/findbyid`, { params: { id } });
            const data = response.data;
            if (data && data.length > 0) {
                const mappedData = mapArrayToDataPage(data[0], dataPage);
                setDataPage(mappedData);
            } else {
                Swal.fire({
                    title: `¡No se encontro ningún dato!`,
                    html: `No se encontraron datos con busqueda realizada`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'blue',
                    showCancelButton: false,
                    showCloseButton: false,
                });
            }

        } catch (error) {
            Swal.fire({
                title: `¡Error al ${modo} ${page}!`,
                html: `Se recibió error de la base de datos, código de error Oracle: <b>${error.response.data}</b>`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue',
                showCancelButton: false,
                showCloseButton: false,
            });
        }
        finally {
            setLoaderBusqueda(false);
        }
    };

    const mapArrayToDataPage = (array, dataPage) => {
        const updatedDataPage = { ...dataPage };
        Object.keys(updatedDataPage).forEach((key, index) => {
            updatedDataPage[key] = array[index] || '';
        });
        return updatedDataPage;
    };

    const handleChange = (e, key) => {
        setDataPage({ ...dataPage, [key]: e.target.value });
    };

    const handleOnClickBuscar = async () => {
        buscarUno(id);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleOnClickBuscar();
        }
    };


    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'} maxWidth={'90%'}>
                <TitleLeft>{modo === 'crear' ? 'Crear ' : modo === 'actualizar' ? 'Actualizar ' : modo === 'buscartodo' ? 'Buscar Todos ' : modo === 'buscaruno' ? 'Buscar ' : modo === 'cancelar' ? 'Cancelar ' : modo === 'finalizar' ? 'Finalizar ' : 'Eliminar '} {page}</TitleLeft>
                {modo === 'buscartodo' ? <DataTable name={page} colums={colums} rows={rows} /> :
                    <>
                        {((modo === 'actualizar' || modo === 'buscartodo' || modo === 'buscaruno' || modo === 'eliminar' || modo === 'cancelar' || modo === 'finalizar') && (userData.tipoUsuario.toLowerCase() !== 'comprador' || page !== 'Cliente')) &&
                            <div style={{ display: 'flex', gap: '20px', marginRight: 'auto', marginLeft: '25px', width: '400px' }}>
                                <TextField
                                    label={"Busqueda " + page}
                                    variant='outlined'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <Button isLoading={loaderBusqueda} variant='contained' width='40%' onClick={handleOnClickBuscar}>
                                    Buscar
                                </Button>
                            </div>

                        }
                        <Form sx={{ display: 'grid', gridTemplateColumns: '300px 300px 300px', gridTemplateRows: 'auto' }}>
                            {fields.map(field => (
                                <TextField
                                    key={field.key}
                                    label={field.label}
                                    variant='outlined'
                                    value={dataPage[field.key]}
                                    onChange={(e) => handleChange(e, field.key)}
                                    type={(field.key === 'contraseña' || field.key === 'clave') ? 'password' : 'text'}
                                />
                            ))}
                        </Form>
                        {modo !== 'buscaruno' ?
                            <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                                <Button isLoading={loader} variant='contained' width='40%' onClick={() => handleOnClickAccion('')}>
                                    {modo === 'crear' ? 'Crear' : modo === 'actualizar' ? 'Actualizar' : modo === 'buscartodo' ? 'Buscar Todo' : modo === 'buscaruno' ? 'Buscar Uno' : modo === 'cancelar' ? 'Cancelar' : modo === 'finalizar' ? 'Finalizar' : 'Eliminar'} {page}
                                </Button>
                                <ButtonCancel variant='contained' width='40%' onClick={() => navigate('/')}>
                                    Cancelar
                                </ButtonCancel>
                            </Box>
                            :
                            <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                                <Button isLoading={loader} variant='contained' width='40%' onClick={() => handleOnClickAccion('actualizar')}>
                                    Actualizar {page}
                                </Button>
                                <Button isLoading={loader} variant='contained' width='40%' onClick={() => handleOnClickAccion('eliminar')}>
                                    Eliminar {page}
                                </Button>
                                {tieneCancelar &&
                                    <Button isLoading={loader} variant='contained' width='40%' onClick={() => handleOnClickAccion('cancelar')}>
                                        Cancelar {page}
                                    </Button>
                                }
                                {tieneFinalizar &&
                                    <Button isLoading={loader} variant='contained' width='40%' onClick={() => handleOnClickAccion('finalizar')}>
                                        Finalizar {page}
                                    </Button>
                                }
                            </Box>
                        }
                    </>
                }
            </Box>
        </BoxMain>
    );
};

export default PageCustomizable;
