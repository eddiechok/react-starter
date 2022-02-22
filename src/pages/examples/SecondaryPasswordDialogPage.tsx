import AppContainer from '@/layout/AppContainer';
import { useSecPwDialog } from '@/providers/SecondaryPasswordDialogProvider';
import { Button } from '@mui/material';
import React from 'react';

const SecondaryPasswordDialogPage = () => {
  const [presentSecPw] = useSecPwDialog();

  const click = () => {
    presentSecPw({
      onSuccess: (secPw) => {
        console.log(secPw);
      }
    });
  };

  return (
    <>
      <AppContainer maxWidth="sm">
        <Button variant="contained" color="primary" onClick={click}>
          Open Dialog
        </Button>
      </AppContainer>
    </>
  );
};

export default SecondaryPasswordDialogPage;
