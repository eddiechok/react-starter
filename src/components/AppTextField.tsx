import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useDp from '../hooks/useDp';
import useErrorMessage from '../hooks/useErrorMessage';

type AppTextFieldProps = TextFieldProps & {
  name: string;
  dp?: number;
  msgLabel?: string;
  label?: string;
};

const AppTextField = ({
  name,
  type,
  dp,
  children,
  className,
  msgLabel,
  ...props
}: AppTextFieldProps) => {
  const { control } = useFormContext();
  const [inputType, setInputType] = useState(type);
  const inputRef = useDp(dp);
  const errorMessage = useErrorMessage({
    name,
    msgLabel: msgLabel || props.label
  });

  const changeInputType = () => {
    setInputType((prevInputType) =>
      prevInputType === 'password' ? 'text' : 'password'
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // to fix changing from uncontrolled input to controlled input
      render={({ field }) => {
        return (
          <TextField
            type={inputType}
            helperText={errorMessage}
            error={!!errorMessage}
            InputProps={{
              endAdornment: type === 'password' && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={changeInputType}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {inputType === 'text' ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            inputRef={inputRef}
            {...field}
            {...props}
          />
        );
      }}
    />
  );
};

export default AppTextField;
