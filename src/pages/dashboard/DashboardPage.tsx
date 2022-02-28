import AppContainer from '@/layout/AppContainer';
import AuthenticatedLayout from '@/layout/AuthenticatedLayout';
import { Typography } from '@mui/material';
import React from 'react';

const DashboardPage = () => {
  return (
    <AuthenticatedLayout>
      <AppContainer>
        <Typography variant="h4">Dashboard</Typography>
      </AppContainer>
    </AuthenticatedLayout>
  );
};

export default DashboardPage;
