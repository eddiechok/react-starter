import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  IconButtonProps
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

export type AppDialogProps = PropsWithChildren<
  DialogProps & {
    onDismiss?: () => void;
    CloseButtonProps?: IconButtonProps;
    title?: string;
  }
>;
const AppDialog = ({
  onDismiss,
  children,
  CloseButtonProps,
  title,
  ...props
}: AppDialogProps) => {
  return (
    <Dialog
      onClose={onDismiss}
      fullWidth
      {...props}
      PaperProps={{
        ...props.PaperProps,
        sx: {
          overflow: 'visible',
          ...props.PaperProps?.sx
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        <IconButton
          aria-label="close"
          onClick={onDismiss}
          {...CloseButtonProps}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default AppDialog;
