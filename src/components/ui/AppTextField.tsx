import useDp from '@/hooks/useDp';
import { FLOATING_LABEL } from '@/shared/constants';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  TextFieldProps
} from '@mui/material';
import React, { useState } from 'react';

type AppTextFieldProps = TextFieldProps & {
  dp?: number;
  floating?: boolean;
};

const AppTextField = React.forwardRef<HTMLDivElement | null, AppTextFieldProps>(
  ({ type, dp, label, floating = FLOATING_LABEL, required, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const inputRef = useDp(dp);

    const changeInputType = () => {
      setInputType((prevInputType) =>
        prevInputType === 'password' ? 'text' : 'password'
      );
    };

    return (
      <Box>
        {!floating && label && (
          <InputLabel required={required} sx={{ mb: 2 }}>
            {label}
          </InputLabel>
        )}
        <TextField
          type={inputType}
          label={floating && label}
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
          InputLabelProps={{
            required: floating && required,
            ...props.InputLabelProps
          }}
        />
      </Box>
    );
  }
);

export default AppTextField;
