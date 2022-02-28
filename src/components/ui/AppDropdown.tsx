import { SelectOption } from '@/shared/type';
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps
} from '@mui/material';
import React from 'react';

export type AppDropdownProps = MenuProps & {
  options?: SelectOption[];
};

const AppDropdown = ({ options, ...props }: AppDropdownProps) => {
  return (
    <Menu {...props}>
      {options?.map((option) => (
        <MenuItem
          value={option.value}
          key={option.value}
          onClick={option.onClick}
        >
          {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
          {option.img && (
            <ListItemIcon>
              <Avatar
                sx={{
                  width: '20px',
                  height: 'auto'
                }}
                src={option.img}
              />
            </ListItemIcon>
          )}
          <ListItemText>{option.title}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AppDropdown;
