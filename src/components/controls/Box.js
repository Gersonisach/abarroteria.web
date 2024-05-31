import { Box as MuiBox, styled } from "@mui/material";

const Box = styled(MuiBox)(({ height = 'auto', width = 'auto', display = 'flex', flexDirection = 'row', justifyContent = 'center', alignItems = 'center', gap = '', padding = '20px', backgroundColor = 'rgba(255, 255, 255, 0.8)', borderRadius = '30px' }) => ({
  width: width,
  height: height,
  display: display,
  flexDirection: flexDirection,
  justifyContent: justifyContent,
  alignItems: alignItems,
  gap: gap,
  padding: padding,
  backgroundColor: backgroundColor,
  borderRadius: borderRadius
}));

export default Box;
