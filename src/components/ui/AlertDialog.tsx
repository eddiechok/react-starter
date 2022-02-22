import commonLabel from '@/translation/commonLabel';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Stack
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type AlertDialogProps = DialogProps & {
  handleClose: () => void;
  title?: string;
  message?: string;
  cancelButton?: {
    show?: boolean;
    text?: string;
    handler?: () => void;
  };
  confirmButton: {
    show?: boolean;
    text?: string;
    handler?: () => void;
  };
};

const AlertDialog = ({
  handleClose,
  title,
  message,
  cancelButton,
  confirmButton,
  ...props
}: AlertDialogProps) => {
  const { t } = useTranslation();

  const onConfirm = () => {
    handleClose();
    confirmButton?.handler && confirmButton?.handler();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      {...props}
      keepMounted
      PaperProps={{
        sx: {
          mx: 4,
          width: '100%'
        }
      }}
    >
      <DialogTitle>{title || t(commonLabel.confirm)}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || t(commonLabel.action_cannot_be_reverted)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction="row">
          {(cancelButton?.show === undefined || cancelButton.show) && (
            <Button onClick={handleClose} variant="text">
              {cancelButton?.text || t(commonLabel.cancel)}
            </Button>
          )}
          {(confirmButton.show === undefined || confirmButton.show) && (
            <Button onClick={onConfirm}>
              {confirmButton.text || t(commonLabel.confirm)}
            </Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
