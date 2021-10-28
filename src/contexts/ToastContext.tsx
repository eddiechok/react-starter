import { Alert, AlertColor, Snackbar, SnackbarProps } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';
import useToggle from '../hooks/useToggle';

type ToastProps = SnackbarProps & {
  color?: AlertColor;
};

const ToastContext = createContext<[(props?: ToastProps) => void, () => void]>([
  () => {},
  () => {}
]);

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC = ({ children }) => {
  const { isOpen, present, dismiss } = useToggle();
  const [snackbarProps, setSnackbarProps] = useState<ToastProps>();

  const onOpen = (props?: ToastProps) => {
    setSnackbarProps(props);
    present();
  };

  return (
    <ToastContext.Provider value={[onOpen, dismiss]}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
