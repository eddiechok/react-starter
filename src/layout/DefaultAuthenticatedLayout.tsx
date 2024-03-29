import useToggle from '@/hooks/useToggle';
import { DRAWER_WIDTH, HAS_SIDEBAR } from '@/shared/constants';
import { Box, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';

const DefaultAuthenticatedLayout = () => {
  const { isOpen, present, dismiss } = useToggle();

  return (
    <Box sx={{ display: 'flex', height: 1 }}>
      <Header present={present} />
      {HAS_SIDEBAR && (
        <Box
          component="nav"
          sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        >
          <Sidebar isOpen={isOpen} dismiss={dismiss} />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: 1, lg: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultAuthenticatedLayout;
