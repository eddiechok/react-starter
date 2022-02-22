import { Capacitor } from '@capacitor/core';
import {
  Avatar,
  Box,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps
} from '@mui/material';
import React, { PropsWithChildren, useMemo } from 'react';
import useToggle from '../../hooks/useToggle';
import { FLOATING_LABEL } from '../../shared/constants';
import { SelectOption } from '../../shared/type';

export type AppSelectProps = PropsWithChildren<SelectProps> & {
  options?: SelectOption[];
  helperText?: string;
  FormControlProps?: FormControlProps;
  floating?: boolean;
};

const AppSelect = React.forwardRef<unknown, AppSelectProps>(
  (
    {
      children,
      options,
      helperText,
      FormControlProps,
      displayEmpty = true,
      floating = FLOATING_LABEL,
      required,
      label,
      ...props
    },
    ref
  ) => {
    const isNative = useMemo(() => Capacitor.isNativePlatform(), []);
    const { isOpen, present, dismiss } = useToggle();
    const isShrinked = displayEmpty && props.value === '' ? true : undefined;

    return options ? (
      <Box>
        {!floating && label && (
          <InputLabel required={required} sx={{ mb: 2 }}>
            {label}
          </InputLabel>
        )}
        <FormControl
          size={props.size}
          fullWidth={props.fullWidth}
          {...FormControlProps}
        >
          {floating && label && (
            <InputLabel shrink={isShrinked} id={props.labelId}>
              {label}
            </InputLabel>
          )}
          <Select
            displayEmpty={displayEmpty}
            input={
              <OutlinedInput
                notched={floating && isShrinked}
                label={floating && label}
              />
            }
            {...props}
            native={isNative}
            ref={ref}
            // manually open and close menu
            MenuProps={{
              open: isOpen,
              onClose: dismiss,
              ...props.MenuProps
            }}
            SelectDisplayProps={{
              // capture the mousedown event before pull-to-refresh
              onMouseDownCapture: (e) => {
                if (e.button !== 0) {
                  return;
                }
                e.preventDefault();
                // stop the event for pull-to-refresh
                e.stopPropagation();
                // open menu
                present();

                // focus the element
                (e.target as HTMLDivElement)?.focus();
              },
              ...props.SelectDisplayProps
            }}
            onChange={(...args) => {
              dismiss(); // close menu when value changed
              props.onChange?.(...args);
            }}
          >
            {children ||
              options.map((option, i) =>
                isNative ? (
                  <option value={option.value} key={i}>
                    {option.title}
                  </option>
                ) : (
                  <MenuItem value={option.value} key={i}>
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
                )
              )}
          </Select>
          {helperText && (
            <FormHelperText error={props.error}>{helperText}</FormHelperText>
          )}
        </FormControl>
      </Box>
    ) : null;
  }
);

export default AppSelect;
