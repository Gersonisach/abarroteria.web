import {Button as MuiButton, styled } from '@mui/material';

const ButtonCancel = styled(MuiButton)(({height = 46, width = '100%', colorEdit='#B47163', backgroundColor='#FFFFFF', backgroundColorHover='#F0ECEC', borderRadius= '10px'}) => ({
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

export default ButtonCancel;