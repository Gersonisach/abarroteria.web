import {Box as MuiBox, styled } from "@mui/material";

const BoxMain = styled(MuiBox)(({height = '100vh', width = '100%',display='flex', flexDirection='row', justifyContent='center', alignItems='center'})=>({
    width: width,
    height: height,
    display: display,
    flexDirection: flexDirection,
    justifyContent: justifyContent,
    alignItems: alignItems,
  }));

export default BoxMain;
