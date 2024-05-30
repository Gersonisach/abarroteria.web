import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {AddCircle as AddIcon, Edit as EditIcon, DeleteForever as DeleteIcon, ManageSearch as SearchAllIcon, Search as SearchIcon } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

export default function MenuOptions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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

  const handleEliminar = () => {
    navigate(props.action + '/eliminar');
    setAnchorEl(null);
  };

  const handleBuscarTodos = () => {
    navigate(props.action + '/obtenertodo');
    setAnchorEl(null);
  };

  const handleBuscarUno = () => {
    navigate(props.action + '/obteneruno');
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
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{fontSize:'11px', backgroundColor:'#A78686', borderRadius:'10px', textTransform:'none', '&:hover':{backgroundColor:'#827676'}}}
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
        <MenuItem onClick={handleCrear} disableRipple>
          <AddIcon />
          Crear
        </MenuItem>
        <MenuItem onClick={handleActualizar} disableRipple>
          <EditIcon />
          Actualizar
        </MenuItem>
        <MenuItem onClick={handleEliminar} disableRipple>
          <SearchAllIcon />
          Eliminar
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleBuscarTodos} disableRipple>
          <DeleteIcon />
          Buscar Todos
        </MenuItem>
        <MenuItem onClick={handleBuscarUno} disableRipple>
          <SearchIcon />
          Buscar Uno
        </MenuItem>
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
