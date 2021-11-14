import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { SchemaOf } from 'yup';
import { Yup } from '../shared/constants';
import commonLabel from '../translation/commonLabel';
import Form from './hook-form/Form';
import classes from './SecondaryPasswordDialog.module.scss';

type SecondaryPasswordDialogProps = DialogProps & {
  handleSubmit?: (secPw: string) => void;
  onClose: () => void;
};

type FormValues = {
  secondary_password: string;
};

const SecondaryPasswordDialog = ({
  handleSubmit,
  ...props
}: SecondaryPasswordDialogProps) => {
  const { t } = useTranslation();

  const schema: SchemaOf<FormValues> = Yup.object({
    secondary_password: Yup.string().required().secondaryPassword()
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const {
    formState: { isValid }
  } = methods;

  const onSubmit = (values: FormValues) => {
    handleSubmit && handleSubmit(values.secondary_password);
    handleClose();
  };

  const handleClose = () => {
    props.onClose();
    methods.reset();
  };

  useEffect(() => {
    if (isValid) {
      methods.handleSubmit(onSubmit)();
    }
  }, [isValid]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      {...props}
      onClose={handleClose}
      keepMounted
      PaperProps={{
        sx: {
          mx: 4,
          width: '100%'
        }
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent
          sx={{
            maxWidth: 340,
            width: '100%',
            margin: 'auto'
          }}
        >
          <DialogContentText></DialogContentText>
          <Controller
            name="secondary_password"
            control={methods.control}
            render={({ field }) => (
              <OtpInput
                numInputs={6}
                isInputNum
                inputStyle={{
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 'bold',
                  flexGrow: 1,
                  padding: '10px 0',
                  '&:focusVisible': {
                    outline: 'none'
                  }
                }}
                className={classes.input_container}
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="text">
            {t(commonLabel.cancel)}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default SecondaryPasswordDialog;
