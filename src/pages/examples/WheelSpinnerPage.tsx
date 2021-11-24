import { Box } from '@mui/material';
import React from 'react';
import AppContainer from '../../layout/AppContainer';
import classes from './WheelSpinnerPage.module.scss';

const WheelSpinnerPage = () => {
  return (
    <AppContainer>
      <Box className={classes.wheel_container}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
        <Box>7</Box>
        <Box>8</Box>
      </Box>
    </AppContainer>
  );
};

export default WheelSpinnerPage;
