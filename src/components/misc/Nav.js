import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import { Person as PersonIcon, Home as HomeIcon } from '@mui/icons-material';
import logo from '../../assets/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../../contexts/AuthContext';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import '../../components/misc/Nav.css'
import MenuOptions from '../controls/MenuOptions';


export default function SearchAppBar() {
    const { logout, userData } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {

        Swal.fire({
            title: 'Verificar',
            text: '¿Seguro que desea cerrar sesión?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'blue',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'grey',
            showCancelButton: true,
            showCloseButton: true,
            allowOutsideClick: true,
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate('/login');
            }

            return;
        });

    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar sx={{ backgroundColor: '#0288d1', gap: '20px', minHeight: '50px !important' }}>
                    <img style={{ width: '60px', height: '60px', objectFit:'contain', objectPosition: 'center', padding:'5px' }} src={logo} alt='img-logo' />
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', fontSize: '11px' }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/')}
                            startIcon={<HomeIcon fontSize='small' />}
                            marginBottom='0px'
                            height='30px'
                            sx={{ fontSize: '11px', padding: '5px', backgroundColor: 'transparent', borderRadius: '10px', textTransform: 'none', '&:hover': { backgroundColor: '#827676' } }}
                        >
                            Home
                        </Button>
                        {userData.tipoUsuario !== 'comprador' &&
                            <>
                                <MenuOptions nombre={'Proveedor'} action={'proveedor'} />
                                <MenuOptions nombre={'Tipo Producto'} action={'tipo-producto'} />
                                <MenuOptions nombre={'Producto'} action={'producto'} />
                                <MenuOptions nombre={'Orden Compra'} action={'orden-compra'} tieneCancelar={true} />
                                <MenuOptions nombre={'Detalle Orden'} action={'detalle-orden'} />

                            </>
                        }
                        {userData.tipoUsuario === 'administrador' &&
                            <MenuOptions nombre={'Usuario'} action={'usuario'} />
                        }
                        {userData.tipoUsuario !== 'bodeguero' &&
                            <>
                                <MenuOptions nombre={'Cliente'} action={'cliente'} />
                                <MenuOptions nombre={'Pedido'} action={'pedido'} tieneCancelar={true} tieneFinalizar={true} />
                                <MenuOptions nombre={'Detalle Pedido'} action={'detalle-pedido'} />
                                <MenuOptions nombre={'Factura'} action={'factura'} tieneCancelar={true} />
                            </>
                        }

                    </div>
                    <Logout onClick={handleLogout}>
                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><PersonIcon fontSize='small' />{userData.nombre}</div>
                        <IconButton color="inherit">
                            <LogoutIcon sx={{ fontSize: '20px' }} />
                        </IconButton>
                    </Logout>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

const Logout = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '5px',
    fontSize: '13px',
    color: 'withe',
    fontWeight: 'bold',
    marginLeft: 'auto',
    cursor: 'pointer',
    '&:hover': { color: '#B4948E' }
}));

