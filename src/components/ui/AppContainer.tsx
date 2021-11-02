import { ArrowDownwardRounded } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Container,
  ContainerProps,
  Typography
} from '@mui/material';
import React from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

type AppContainerProps = ContainerProps & {
  onRefresh?: () => Promise<any>;
  children: JSX.Element;
};

const AppContainer = ({ onRefresh, children, ...props }: AppContainerProps) => {
  return (
    <Container
      {...props}
      sx={{
        height: '100%',
        py: 4,
        ...props.sx
      }}
    >
      {!!onRefresh ? (
        <PullToRefresh
          pullDownThreshold={85}
          onRefresh={onRefresh}
          refreshingContent={
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          }
          pullingContent={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                my: 2
              }}
            >
              <ArrowDownwardRounded />
              <Typography variant="caption" sx={{ textAlign: 'center', mt: 1 }}>
                Pull to Refresh
              </Typography>
            </Box>
          }
        >
          {children}
        </PullToRefresh>
      ) : (
        children
      )}
    </Container>
  );
};

export default AppContainer;
