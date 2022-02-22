import { MenuProps } from '@mui/material';
import React from 'react';

const useDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const present = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dismiss = () => {
    setAnchorEl(null);
  };

  return {
    menuProps: {
      anchorEl,
      open,
      onClose: dismiss,
      onClick: dismiss
    } as MenuProps,
    present,
    dismiss
  };
};

export default useDropdown;
