import { Button as MuiButton, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const StyledButton = styled(MuiButton)(({ theme, ...props }) => ({
  borderRadius: props.borderRadius || '10px',
  height: props.height || 46,
  width: props.width || '100%',
  textTransform: 'none',
  fontWeight: 600,
  lineHeight: '26px',
  textAlign: 'left',
  marginBottom: props.marginBottom || '15px',
  color: props.colorEdit || '#FFFFFF',
  backgroundColor: props.backgroundColor || '#B47163',
  '&:hover': { backgroundColor: props.backgroundColorHover || '#B4948E' },
}));

const Button = ({ isLoading, children, ...props }) => (
  <StyledButton {...props} disabled={isLoading}>
    {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
  </StyledButton>
);

export default Button;
