import React, { useState } from 'react';
import Box from '../controls/Box';
import NoImage from '../../assets/no-fund.jpg';
import { Divider } from '@mui/material';
import Button from '../controls/Button';
import '../../shared/ConcurrecyGT';
import './CardProducto.css';
import { useNavigate } from 'react-router-dom';

const CardProducto = ({ producto }) => {
    const [error, setError] = useState(true);
    const navigate = useNavigate();

    // Maneja el error solo la primera vez que ocurre
    const handleImageError = () => {
        if (error) {
            setError(false);
        }
    };

    let rutaImagen;

    try {
        rutaImagen = require(`../../assets/imagenes-productos/${producto[1]}.png`);
    } catch (e) {
        rutaImagen = NoImage;
    }

    const onClickAgregar = () => {
        navigate('/pedido/crear',{ state: { pedidoId: producto[0] }})
    }

    return (
        <Box width={200} height={370} flexDirection={'column'} position={'relative'}>
            {producto[11] <= 0 && (
                <div id='container-desvanecimiento-producto-card' />
            )}
            <div
                id="container-img-productocard"
                title={producto[11] > 0 ? "Existencia en Sucursal: " + producto[11] : "No hay existencias en tienda"}
            >
                <img
                    id='imagen-productocard'
                    onError={handleImageError}
                    src={rutaImagen}
                    alt="img-producto"
                    loading="lazy"
                />
            </div>
            <Divider sx={{ my: 0.5 }} />
            <div
                id="container-informacion-productocard"
                title={producto[11] > 0 ? "Existencia en Sucursal: " + producto[11] : "No hay existencias en tienda"}
            >
                <div id="codigo-productocard"><strong>Id: </strong>{producto[0]}</div>
                <div id="codigo-productocard"><strong>Codigo: </strong>{producto[1]}</div>
                <div id="codigo-productocard"><strong>Nombre: </strong>{producto[2]}</div>
                <div id="descripcion-productocard"><strong>Descripción: </strong>{producto[3]}</div>
                <div id="codigo-productocard"><strong>Unidad de Medida: </strong>{producto[5]}</div>
                <div id="container-precios-productocard">
                    <div id="precio-normal-productocard"><span>Precio </span><span>{producto[6].toCurrency()}</span></div>
                    <div id="precio-efectivo-productocard"><span>Cantidad en Existencia </span><span>{producto[11]}</span></div>
                </div>
            </div>
            <Button onClick={onClickAgregar} variant='contained'>
                Agregar a Pedido
            </Button>
        </Box>
    );
};

export default CardProducto;
