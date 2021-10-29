import { Capacitor } from '@capacitor/core';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@mui/material';
import React, { PropsWithChildren, useMemo } from 'react';
import { SelectOption } from '../../shared/type';

export type AppSelectProps = PropsWithChildren<SelectProps> & {
  options?: SelectOption[];
  helperText?: string;
};

const AppSelect = ({
  children,
  options,
  helperText,
  ...props
}: AppSelectProps) => {
  const isNative = useMemo(() => Capacitor.isNativePlatform(), []);

  return options ? (
    <FormControl>
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select {...props} native={isNative}>
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
      <FormHelperText error={props.error}>{helperText}</FormHelperText>
    </FormControl>
  ) : null;
};

export default AppSelect;
