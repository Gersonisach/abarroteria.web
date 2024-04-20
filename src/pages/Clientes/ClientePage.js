import React, { useState } from 'react';
import axios from 'axios';
import TextField from '../../components/controls/TextField';
import Box from '../../components/controls/Box';
import Button from '../../components/controls/Button';

const ClientePage = () => {
    const [cliente_id, setClienteId] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nit, setNit] = useState('');
    const [paisOrigen, setPaisOrigen] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccionEntrega, setDireccionEntrega] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [numeroTarjetaCredito, setNumeroTarjetaCredito] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/clientescreate', {
                cliente_id,
                nombres,
                apellidos,
                nit,
                pais_origen: paisOrigen,
                telefono,
                direccion_entrega: direccionEntrega,
                correo_electronico: correoElectronico,
                numero_tarjeta_credito: numeroTarjetaCredito
            });
            console.log('Respuesta del servidor:', response.data);
            // Realizar alguna acción adicional después de enviar los datos, como limpiar el formulario o mostrar un mensaje de éxito.
        } catch (error) {
            console.error('Error al enviar los datos al servidor:', error);
        }
    };

    return (
        <Box sx={{ display: 'grid', placeItems: 'center', width:'100%', height:'100%' }}>
            <form onSubmit={handleSubmit} style={{ width: '80%' }}>
                <Box sx={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <TextField
                        label="Cliente ID"
                        variant="outlined"
                        value={cliente_id}
                        onChange={(e) => setClienteId(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Nombres"
                        variant="outlined"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Apellidos"
                        variant="outlined"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="NIT"
                        variant="outlined"
                        value={nit}
                        onChange={(e) => setNit(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="País de Origen"
                        variant="outlined"
                        value={paisOrigen}
                        onChange={(e) => setPaisOrigen(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Teléfono"
                        variant="outlined"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Dirección de Entrega"
                        variant="outlined"
                        value={direccionEntrega}
                        onChange={(e) => setDireccionEntrega(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correo Electrónico"
                        variant="outlined"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Número de Tarjeta de Crédito"
                        variant="outlined"
                        value={numeroTarjetaCredito}
                        onChange={(e) => setNumeroTarjetaCredito(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Button variant="contained" type="submit">Enviar</Button>
            </form>
        </Box>
    );
};

export default ClientePage;
