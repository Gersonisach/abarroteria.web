import { TextField as MuiTextField, styled } from '@mui/material';

const TextField = styled(MuiTextField)(({ height = 'auto', width = '100%', labelColor = '#454141' }) => ({
  width: width,
  height: height,
  '& .MuiInputBase-root': { 
    borderRadius: '15px',
    '& fieldset': {
      borderWidth: '2px',
      borderColor:'#757070'
    },
  },
  '& .MuiFormLabel-root': {
    color: labelColor,
  },
}));

export default TextField;