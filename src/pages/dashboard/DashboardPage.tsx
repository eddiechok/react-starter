import { Container, Typography } from '@mui/material';
//@ts-ignore
import React from 'react';
import Header from '../../components/layout/Header';

const DashboardPage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <Container>
        <Typography variant="h4">Dashboard</Typography>
      </Container>
    </>
  );
};

export default DashboardPage;
