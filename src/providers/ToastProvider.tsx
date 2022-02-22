import useToggle from '@/hooks/useToggle';
import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarProps,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react';

type ToastProps = SnackbarProps & {
  color?: AlertColor;
};

const ToastContext = createContext<[(props?: ToastProps) => void, () => void]>([
  () => void 0,
  () => void 0
]);

export const useToast = () => useContext(ToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const { isOpen, present, dismiss } = useToggle();
  const [snackbarProps, setSnackbarProps] = useState<ToastProps>();
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const onOpen = useCallback(
    (props?: ToastProps) => {
      setSnackbarProps(props);
      present();
    },
    [present]
  );

  return (
    <ToastContext.Provider value={[onOpen, dismiss]}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isBigScreen ? 'left' : 'center'
        }}
        open={isOpen}
        onClose={dismiss}
        autoHideDuration={5000}
        {...snackbarProps}
      >
        <Alert
          onClose={dismiss}
          severity={snackbarProps?.color}
          sx={{ width: '100%' }}
        >
          {snackbarProps?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
