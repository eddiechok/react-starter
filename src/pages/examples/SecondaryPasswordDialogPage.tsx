import { Button, Container } from '@mui/material';
import React from 'react';
import Header from '../../components/layout/Header';
import { useSecPwDialog } from '../../contexts/SecondaryPasswordDialogContext';

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
      <Header title="Secondary Password Dialog" />
      <Container maxWidth="sm">
        <Button variant="contained" color="primary" onClick={click}>
          Open Dialog
        </Button>
      </Container>
    </>
  );
};

export default SecondaryPasswordDialogPage;
