import { styled } from "@mui/material";

const Form = styled('form')(({ width = '100%', height = '100%', display = 'flex', flexDirection = 'column', justifyContent = 'center', alignItems = 'center', backgroundColor = '', flex='', borderRadius='20px' }) => ({
  maxWidth: width,
  minHeight: height,
  padding: '20px',
  display: display,
  flexDirection: flexDirection,
  justifyContent: justifyContent,
  alignItems: alignItems,
  backgroundColor: backgroundColor,
  gap: '20px',
  boxSizing: 'border-box',
  flex: flex,
  borderRadius: borderRadius
}));

export default Form;