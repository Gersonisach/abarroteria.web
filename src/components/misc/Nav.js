import {React, useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthContext from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import '../../components/misc/Nav.css'


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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, gap: '10px' }}
                    >
                        <MenuIcon />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Categorias
                        </Typography>
                    </IconButton>
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
                        <NavLink className="nav-link" to="/create-detalle-orden-compra" activeClassName="active">Detalle Orden Compra</NavLink>
                        <NavLink className="nav-link" to="/create-detalle-pedido" activeClassName="active">Detalle Pedido</NavLink>
                        <NavLink className="nav-link" to="/create-factura" activeClassName="active">Factura</NavLink>
                        <NavLink className="nav-link" to="/create-orden-compra" activeClassName="active">Orden Compra</NavLink>
                        <NavLink className="nav-link" to="/create-pedido" activeClassName="active">Pedido</NavLink>
                        <NavLink className="nav-link" to="/create-producto" activeClassName="active">Producto</NavLink>
                        <NavLink className="nav-link" to="/create-proveedor" activeClassName="active">Proveedor</NavLink>
                        <NavLink className="nav-link" to="/create-tipo-producto" activeClassName="active">Tipo Producto</NavLink>
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
