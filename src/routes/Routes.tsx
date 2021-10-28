import React from 'react';
import { useApp } from '../contexts/AppContext';
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
