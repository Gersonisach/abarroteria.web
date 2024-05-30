import React, { useState, useEffect } from 'react';
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

const PageCustomizable = ({ modo, data, page, fields, colums }) => {
    const [dataPage, setDataPage] = useState({ ...data });
    const [id, setId] = useState('');
    const [loader, setLoader] = useState(false);
    const [loaderBusqueda, setLoaderBusqueda] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (modo === 'buscartodo') {
            buscarTodo();
        }

        setDataPage({ ...data })
            setId('');
// eslint-disable-next-line
    }, [modo]);

    const handleOnClickAccion = async (action) => {
        try {
            setLoader(true);

            if (modo === 'crear') {
                await axios.post(`http://localhost:5000/${page}/create`, { ...dataPage });
            }
            else if (modo === 'actualizar' || action === 'actualizar') {
                await axios.post(`http://localhost:5000/${page}/update`, { ...dataPage });
            }
            else if (modo === 'eliminar' || action === 'eliminar') {
                await axios.post(`http://localhost:5000/${page}/delete`, { ...dataPage });
            }

            Swal.fire({
                title: `${page}`,
                text: 'Proceso fue satisfactorio.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'orange',
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
                confirmButtonColor: 'orange',
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
            setRows(response.data);

        } catch (error) {
            Swal.fire({
                title: `¡Error al ${modo} ${page}!`,
                html: `Se recibió error de la base de datos, código de error Oracle: <b>${error.response.data}</b>`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'orange',
                showCancelButton: false,
                showCloseButton: false,
            });
        }
        finally {
            setLoader(false);
        }
    };

    const buscarUno = async () => {
        try {
            setLoaderBusqueda(true);

            let response;

            response = await axios.get(`http://localhost:5000/${page}/findbyid`, { params: { id } });
            const data = response.data;
            if (data && data.length > 0) {
                const mappedData = mapArrayToDataPage(data[0], dataPage);
                setDataPage(mappedData);
            }else{
                Swal.fire({
                    title: `¡No se encontro ningún dato!`,
                    html: `No se encontraron datos con busqueda realizada`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'orange',
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
                confirmButtonColor: 'orange',
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
        buscarUno();
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'}>
                <TitleLeft>{modo === 'crear' ? 'Crear ' : modo === 'actualizar' ? 'Actualizar ' : modo === 'buscartodo' ? 'Buscar Todos ' : modo === 'buscaruno' ? 'Buscar ' : 'Eliminar '} {page}</TitleLeft>
                {modo === 'buscartodo' ? <DataTable name={page + 'es'} colums={colums} rows={rows} /> :
                    <>
                        {(modo === 'actualizar' || modo === 'buscartodo' || modo === 'buscaruno' || modo === 'eliminar') &&
                            <div style={{ display: 'flex', gap: '20px', marginRight: 'auto', marginLeft: '25px', width: '400px' }}>
                                <TextField
                                    label={"Busqueda " + page}
                                    variant='outlined'
                                    color='error'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                                <Button isLoading={loaderBusqueda} variant='contained' width='40%' onClick={handleOnClickBuscar}>
                                    Buscar
                                </Button>
                            </div>

                        }
                        <Form sx={{ display: 'grid', gridTemplateColumns: '300px 300px 300px', gridTemplateRows: '70px 70px 70px' }}>
                            {fields.map(field => (
                                <TextField
                                    key={field.key}
                                    label={field.label}
                                    variant='outlined'
                                    color='error'
                                    value={dataPage[field.key]}
                                    onChange={(e) => handleChange(e, field.key)}
                                />
                            ))}
                        </Form>
                        {modo !== 'buscaruno' ?
                            <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                                <Button isLoading={loader} variant='contained' width='40%' onClick={() => handleOnClickAccion('')}>
                                    {modo === 'crear' ? 'Crear' : modo === 'actualizar' ? 'Actualizar' : modo === 'buscartodo' ? 'Buscar Todo' : modo === 'buscaruno' ? 'Buscar Uno' : 'Eliminar'} {page}
                                </Button>
                                <ButtonCancel variant='contained' width='40%' onClick={() => setDataPage({ ...data })}>
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
                            </Box>
                        }
                    </>
                }
            </Box>
        </BoxMain>
    );
};

export default PageCustomizable;
