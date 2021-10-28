import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
//@ts-ignore
// import Lottie from "react-lottie-player";
// import LoadingJson from "../../../assets/loading.json";

const Loading = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
      {/* <Lottie
        loop
        animationData={LoadingJson}
        play
        className="absolute left-0 right-0 top-0 bottom-0 m-auto"
        style={{ width: 150, height: 150, zIndex: 3 }}
      /> */}
    </Backdrop>
  );
};

export default Loading;
