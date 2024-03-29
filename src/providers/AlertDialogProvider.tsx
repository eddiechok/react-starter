import AlertDialog, { AlertDialogProps } from '@/components/ui/AlertDialog';
import useToggle from '@/hooks/useToggle';
import React, { createContext, useCallback, useContext, useState } from 'react';

export type AlertSetup = Omit<AlertDialogProps, 'open' | 'handleClose'>;

const AlertDialogContext = createContext<
  [(alertProps: AlertSetup) => void, () => void]
>([() => void 0, () => void 0]);

export const useAlert = () => useContext(AlertDialogContext);

const AlertDialogProvider: React.FC = ({ children }) => {
  const { present, dismiss, isOpen } = useToggle();
  const [alertProps, setAlertProps] = useState<AlertSetup>({
    confirmButton: {}
  });

  // open modal and set alert props
  const onOpen = useCallback(
    (_alertProps: AlertSetup) => {
      setAlertProps(_alertProps);
      present();
    },
    [present]
  );

  return (
    <>
      <AlertDialogContext.Provider value={[onOpen, dismiss]}>
        {children}
      </AlertDialogContext.Provider>
      <AlertDialog open={isOpen} handleClose={dismiss} {...alertProps} />
    </>
  );
};

export default AlertDialogProvider;
