import React, { createContext, useCallback, useContext, useState } from 'react';
import SecondaryPasswordDialog from '../components/ui/secondary-password-dialog/SecondaryPasswordDialog';
import useToggle from '../hooks/useToggle';

type SecondaryPasswordDialogSetup = {
  onSuccess: (password: string) => any;
};

const SecondaryPasswordDialogContext = createContext<
  [(setup: SecondaryPasswordDialogSetup) => void]
>([() => void 0]);

export const useSecPwDialog = () => useContext(SecondaryPasswordDialogContext);

export const SecondaryPasswordDialogProvider: React.FC = ({ children }) => {
  const { present, dismiss, isOpen } = useToggle();
  const [handleSubmit, setHandleSubmit] = useState<(password: string) => any>();

  // open modal and set onSubmit callback
  const onOpen = useCallback(
    (setup: SecondaryPasswordDialogSetup) => {
      present();
      setHandleSubmit(() => setup.onSuccess);
    },
    [present]
  );

  return (
    <>
      <SecondaryPasswordDialogContext.Provider value={[onOpen]}>
        {children}
      </SecondaryPasswordDialogContext.Provider>
      <SecondaryPasswordDialog
        open={isOpen}
        onClose={dismiss}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
