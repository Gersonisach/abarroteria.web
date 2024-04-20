import {Button as MuiButton, styled } from '@mui/material';

const Button = styled(MuiButton)(({height = 46, width = '100%', colorEdit='#FFFFFF', backgroundColor='#B47163',backgroundColorHover='#B4948E', borderRadius= '10px'}) => ({
    borderRadius: borderRadius,
    height: height,
    width: width,
    textTransform: 'none',
    fontWeight: 600,
    lineHeight: '26px',
    textAlign: 'left',
    marginBottom: '15px',
    color: colorEdit,
    backgroundColor: backgroundColor,
    '&:hover':{backgroundColor: backgroundColorHover}
}));

export default Button;