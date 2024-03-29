import { useApp } from '@/providers/AppProvider';
import React from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

const Routes = () => {
  const { isAuthenticated } = useApp();

  if (isAuthenticated) {
    return <PrivateRoutes />;
  } else {
    return <PublicRoutes />;
  }
};

export default Routes;
