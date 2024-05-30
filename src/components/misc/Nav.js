import {React, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, InputBase } from '@mui/material';
import {Search as SearchIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import '../../components/misc/Nav.css'
import MenuOptions from '../controls/MenuOptions';


export default function SearchAppBar() {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () =>{

        Swal.fire({
            title: 'Verificar',
            text: '¿Seguro que desea cerrar sesión?',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'orange',
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
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: '#B47163', gap: '20px' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', fontSize: '10px' }}>
                        <MenuOptions nombre={'Proveedor'} action={'proveedor'} />
                        <MenuOptions nombre={'Tipo Producto'} action={'tipo-producto'} />
                        <MenuOptions nombre={'Cliente'} action={'cliente'} />
                        <MenuOptions nombre={'Usuario'} action={'usuario'} />
                        <MenuOptions nombre={'Producto'} action={'producto'} />
                        <MenuOptions nombre={'Orden Compra'} action={'orden-compra'} />
                        <MenuOptions nombre={'Pedido'} action={'pedido'} />
                        <MenuOptions nombre={'Detalle Orden'} action={'detalle-orden'} />
                        <MenuOptions nombre={'Factura'} action={'factura'} />
                        <MenuOptions nombre={'Detalle Pedido'} action={'detalle-pedido'} />
                    </div>
                    <IconButton onClick={handleLogout} color="inherit" sx={{marginLeft:'auto',}}>
                        <LogoutIcon sx={{ fontSize: '35px', cursor: 'pointer', '&:hover': { color: 'black' } }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '300px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
