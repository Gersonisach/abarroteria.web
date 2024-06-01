import React, { useState, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AddCircle as AddIcon, Edit as EditIcon, DeleteForever as DeleteIcon, ManageSearch as 
  SearchAllIcon, Search as SearchIcon, Cancel as CancelIcon, DownloadDone as DoneIcon,
  Face as ClienteIcon, AddHome as ProveedorIcon, Inventory as ProductoIcon, Category as TipoProductoIcon, FactCheck as OrdenIcon,
  ArtTrack as DetalleOrdenIcon, Assignment as PedidoIcon, AssignmentTurnedIn as DetallePedidoIcon, Feed as FacturaIcon,
  ManageAccounts as UsuarioIcon} from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export default function MenuOptions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCrear = () => {
    navigate(props.action + '/crear');
    setAnchorEl(null);
  };

  const handleActualizar = () => {
    navigate(props.action + '/actualizar');
    setAnchorEl(null);
  };

  const handleCancelar = () => {
    navigate(props.action + '/cancelar');
    setAnchorEl(null);
  };

  const handleFinalizar = () => {
    navigate(props.action + '/finalizar');
    setAnchorEl(null);
  };

  const handleEliminar = () => {
    navigate(props.action + '/eliminar');
    setAnchorEl(null);
  };

  const handleBuscarTodos = () => {
    navigate(props.action + '/buscartodo');
    setAnchorEl(null);
  };

  const handleBuscarUno = () => {
    navigate(props.action + '/buscaruno');
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        startIcon={props.action === 'proveedor' ? <ProveedorIcon/> : props.action === 'tipo-producto' ? <TipoProductoIcon/> : props.action === 'producto' ? <ProductoIcon/> :
        props.action === 'orden-compra' ? <OrdenIcon/> : props.action === 'detalle-orden' ? <DetalleOrdenIcon/> : props.action === 'usuario' ? <UsuarioIcon/> : props.action === 'cliente' ? <ClienteIcon/> :
        props.action === 'pedido' ? <PedidoIcon/> : props.action === 'detalle-pedido' ? <DetallePedidoIcon/> : <FacturaIcon/>}
        sx={{ fontSize: '11px', padding:'5px', backgroundColor: 'transparent', borderRadius: '10px', textTransform: 'none', '&:hover': { backgroundColor: '#827676' }, gap:'0px' }}
      >
        {props.nombre}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {(userData.tipoUsuario.toLowerCase() !== 'comprador' || props.action === 'pedido') &&
          <MenuItem onClick={handleCrear} disableRipple>
            <AddIcon />
            Crear
          </MenuItem>
        }
        {(userData.tipoUsuario.toLowerCase() !== 'comprador' || props.action === 'pedido' || props.action === 'cliente') &&
          <MenuItem onClick={handleActualizar} disableRipple>
            <EditIcon />
            Actualizar
          </MenuItem>
        }
        {userData.tipoUsuario.toLowerCase() === 'administrador' &&
          <MenuItem onClick={handleEliminar} disableRipple>
            <DeleteIcon />
            Eliminar
          </MenuItem>
        }
        {(props.tieneCancelar && (userData.tipoUsuario.toLowerCase() !== 'comprador' || props.action === 'pedido')) &&
          <MenuItem onClick={handleCancelar} disableRipple>
            <CancelIcon />
            Cancelar
          </MenuItem>
        }
        {props.tieneFinalizar &&
          <MenuItem onClick={handleFinalizar} disableRipple>
            <DoneIcon />
            Finalizar
          </MenuItem>
        }
        {(userData.tipoUsuario.toLowerCase() !== 'comprador' || props.action === 'pedido' || props.action === 'detalle-pedido' || props.action === 'factura') &&
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleBuscarTodos} disableRipple>
              <SearchAllIcon />
              Buscar Todos
            </MenuItem>
          </>
        }
        {userData.tipoUsuario.toLowerCase() !== 'comprador' &&
          <MenuItem onClick={handleBuscarUno} disableRipple>
            <SearchIcon />
            Buscar Uno
          </MenuItem>
        }
      </StyledMenu>
    </div>
  );
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
