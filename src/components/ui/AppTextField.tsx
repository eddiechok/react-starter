import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material';
import React, { useState } from 'react';
import useDp from '../../hooks/useDp';

type AppTextFieldProps = TextFieldProps & {
  dp?: number;
};

const AppTextField = React.forwardRef<HTMLDivElement | null, AppTextFieldProps>(
  ({ type, dp, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const inputRef = useDp(dp);

    const changeInputType = () => {
      setInputType((prevInputType) =>
        prevInputType === 'password' ? 'text' : 'password'
      );
    };

    return (
      <TextField
        type={inputType}
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
        ref={ref}
        {...props}
      />
    );
  }
);

export default AppTextField;
