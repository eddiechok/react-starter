import { Typography } from '@mui/material';
//@ts-ignore
import React from 'react';
import Header from '../../components/layout/Header';
import AppContainer from '../../components/ui/AppContainer';

const DashboardPage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <AppContainer>
        <Typography variant="h4">Dashboard</Typography>
      </AppContainer>
    </>
  );
};

export default DashboardPage;
