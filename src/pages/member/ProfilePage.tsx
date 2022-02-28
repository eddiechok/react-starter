import AppContainer from '@/layout/AppContainer';
import AuthenticatedLayout from '@/layout/AuthenticatedLayout';
import { Typography } from '@mui/material';
import React from 'react';

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <AppContainer>
        <Typography variant="h4">Profile</Typography>
      </AppContainer>
    </AuthenticatedLayout>
  );
};

export default ProfilePage;
