import React, { useEffect, useState } from 'react';
import BoxMain from '../../components/controls/BoxMain';
import CardProducto from '../../components/card/CardProducto';
import Box from '../../components/controls/Box';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../components/styles/BackgroudImagen.css';

const HomePage = () => {
    const [dataPage, setDataPage] = useState([]);

    useEffect(() => {
        buscarTodo();
    }, []);

    const buscarTodo = async () => {
        try {

            const response = await axios.get('http://localhost:5000/producto/findall');

            const data = response.data;
            if (data && data.length > 0) {

                const productosConStock = data.filter(producto => producto[11] > 0);
                const productosSinStock = data.filter(producto => producto[11] === 0);

                // Ordenar ambos grupos por precio de mayor a menor
                productosConStock.sort((a, b) => b[6] - a[6]);
                productosSinStock.sort((a, b) => b[6] - a[6]);

                // Concatenar los productos con stock primero y los sin stock después
                const productosOrdenados = [...productosConStock, ...productosSinStock];

                setDataPage(productosOrdenados);
            } else {
                Swal.fire({
                    title: '¡No se encontró ningún producto!',
                    html: 'No se encontraron datos con la búsqueda realizada',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'blue',
                    showCancelButton: false,
                    showCloseButton: false,
                });
            }

        } catch (error) {
            Swal.fire({
                title: '¡Error al obtener productos!',
                html: `Se recibió un error de la base de datos, código de error Oracle: <b>${error.response.data}</b>`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'blue',
                showCancelButton: false,
                showCloseButton: false,
            });
        } finally {
        }
    };

    return (
        <BoxMain className='fondo-con-imagen' flexDirection={'column'} gap={'40px'} sx={{ paddingTop: '100px' }}>
            <Box><strong style={{ fontSize: '30px' }}>Productos Disponibles</strong></Box>
            <div style={{ width: '100%', height: '100%', display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 210px))' }}>
                {dataPage?.map((producto, index) => (
                    <CardProducto key={index} producto={producto} />
                ))}
            </div>
        </BoxMain>
    );
};

export default HomePage;
