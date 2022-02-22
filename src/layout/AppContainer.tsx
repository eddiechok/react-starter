import AppRefresher, { AppRefresherProps } from '@/components/ui/AppRefresher';
import { Container, ContainerProps } from '@mui/material';
import React from 'react';

type AppContainerProps = ContainerProps & AppRefresherProps;

const AppContainer = ({ onRefresh, children, ...props }: AppContainerProps) => {
  const containerProps: ContainerProps = {
    ...props,
    sx: {
      py: 8,
      ...props.sx
    }
  };

  return onRefresh ? (
    <AppRefresher onRefresh={onRefresh}>
      <Container {...containerProps}>{children}</Container>
    </AppRefresher>
  ) : (
    <Container {...containerProps}>{children}</Container>
  );
};

export default AppContainer;
