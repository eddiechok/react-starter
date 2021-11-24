// import { ArrowDownwardRounded } from '@mui/icons-material';
import { BoxProps } from '@mui/material';
import React, { PropsWithChildren } from 'react';
// import PullToRefresh from 'react-simple-pull-to-refresh';

export type AppRefresherProps = BoxProps &
  PropsWithChildren<{
    onRefresh?: () => Promise<any>;
  }>;

const AppRefresher = ({ onRefresh, children, ...props }: AppRefresherProps) => {
  return <>{children}</>;
  // return onRefresh ? (
  //   <PullToRefresh
  //     pullDownThreshold={100}
  //     maxPullDownDistance={120}
  //     onRefresh={onRefresh}
  //     refreshingContent={
  //       <Box
  //         {...props}
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'center',
  //           my: 8,
  //           ...props.sx
  //         }}
  //       >
  //         <CircularProgress />
  //       </Box>
  //     }
  //     pullingContent={
  //       <Box
  //         {...props}
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           my: 8,
  //           ...props.sx
  //         }}
  //       >
  //         <ArrowDownwardRounded />
  //         <Typography variant="caption" sx={{ textAlign: 'center', mt: 1 }}>
  //           Pull to Refresh
  //         </Typography>
  //       </Box>
  //     }
  //   >
  //     <>{children}</>
  //   </PullToRefresh>
  // ) :
  // null;
};

export default AppRefresher;
