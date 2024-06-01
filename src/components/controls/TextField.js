import { TextField as MuiTextField, styled } from '@mui/material';

const TextField = styled(MuiTextField)(({ height = 'auto', width = '100%'}) => ({
  width: width,
  height: height,
  '& .MuiInputBase-root': { 
    borderRadius: '15px',
    '& fieldset': {
      borderWidth: '2px',
    },
  },
}));

export default TextField;