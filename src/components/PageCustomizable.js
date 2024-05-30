import React, { useState } from 'react';
import Box from './controls/Box';
import BoxMain from './controls/BoxMain';
import Form from './controls/Form';
import TextField from './controls/TextField';
import Button from './controls/Button';
import ButtonCancel from './controls/ButtonCancel';
import TitleLeft from './controls/TitleLeft';
import axios from 'axios';
import Swal from 'sweetalert2';
import './styles/BackgroudImagen.css'

const PageCustomizable = ({ modo, data, page, fields }) => {
    const [dataPage, setDataPage] = useState({ ...data });
    const [id, setId] = useState('');

    const handleOnClickAccion = async () => {
        try {
            let response;

            if (modo === 'crear') {
                response = await axios.post(`http://localhost:5000/${page}/create`, { ...dataPage });
            }
            else if (modo === 'actualizar') {
                response = await axios.post(`http://localhost:5000/${page}/update`, { ...dataPage });
            }
            else if (modo === 'eliminar') {
                response = await axios.post(`http://localhost:5000/${page}/delete`, dataPage.id);
            }
            else if (modo === 'buscartodo') {
                response = await axios.delete(`http://localhost:5000/${page}/findall`);
            }
            else if (modo === 'buscaruno') {
                response = await axios.delete(`http://localhost:5000/${page}/findbycorreo/${dataPage.id}`);
            }

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


        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleChange = (e, key) => {
        setDataPage({ ...dataPage, [key]: e.target.value });
    };

    const handleOnClickBuscar = async () => {
        try {
            let response;

            if (modo === 'buscartodo') {
                response = await axios.delete(`http://localhost:5000/${page}/findall`);
            }
            else if (modo === 'buscaruno') {
                response = await axios.delete(`http://localhost:5000/${page}/findbycorreo/${id}`);
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <BoxMain className='fondo-con-imagen'>
            <Box flexDirection={'column'} height={'auto'} width={'auto'}>
                <TitleLeft>{modo === 'crear' ? 'Crear' : modo === 'actualizar' ? 'Actualizar' : modo === 'buscartodo' ? 'Buscar Todo' : modo === 'buscaruno' ? 'Buscar Uno' : 'Eliminar'} {page}</TitleLeft>
                {(modo === 'actualizar' || modo === 'buscartodo' || modo === 'buscaruno' || modo === 'eliminar') &&
                    <div style={{ display: 'flex', gap: '20px', marginLeft: 'auto', width: '400px' }}>
                        <TextField
                            label={"Busqueda " + page}
                            variant='outlined'
                            color='error'
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <Button variant='contained' width='40%' onClick={handleOnClickBuscar}>
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
                <Box width={'100%'} gap={'20px'} backgroundColor='none'>
                    <Button variant='contained' width='40%' onClick={handleOnClickAccion}>
                        {modo === 'crear' ? 'Crear' : modo === 'actualizar' ? 'Actualizar' : modo === 'buscartodo' ? 'Buscar Todo' : modo === 'buscaruno' ? 'Buscar Uno' : 'Eliminar'} {page}
                    </Button>
                    <ButtonCancel variant='contained' width='40%' onClick={() => setDataPage({...data})}>
                        Cancelar
                    </ButtonCancel>
                </Box>
            </Box>
        </BoxMain>
    );
};

export default PageCustomizable;
