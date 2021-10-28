import { Capacitor } from '@capacitor/core';
import { MenuItem, Select, SelectProps } from '@mui/material';
import React, { PropsWithChildren, useMemo } from 'react';
import { SelectOption } from '../../shared/type';

export type AppSelectProps = PropsWithChildren<SelectProps> & {
  options?: SelectOption[];
};

const AppSelect = ({ children, options, ...props }: AppSelectProps) => {
  const isNative = useMemo(() => Capacitor.isNativePlatform(), []);

  return options ? (
    <Select native={isNative} {...props}>
      {children ||
        options.map((option, i) =>
          isNative ? (
            <option value={option.value} key={i}>
              {option.title}
            </option>
          ) : (
            <MenuItem value={option.value} key={i}>
              {option.title}
            </MenuItem>
          )
        )}
    </Select>
  ) : null;
};

export default AppSelect;
