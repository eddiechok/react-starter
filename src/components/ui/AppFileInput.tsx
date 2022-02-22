import { UploadFile } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  TextFieldProps
} from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { FLOATING_LABEL } from '../../shared/constants';

export type AppFileInputProps = TextFieldProps & {
  fileInputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  fileValue?: FileList | null;
  floating?: boolean;
};

const AppFileInput = ({
  fileInputProps,
  fileValue,
  floating = FLOATING_LABEL,
  required,
  label,
  ...props
}: AppFileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const upload = () => {
    inputRef.current?.click();
  };

  const fileNames = useMemo(
    () =>
      Array.from(fileValue || [])
        .map((file) => file.name)
        .join(', '),
    [fileValue]
  );

  return (
    <Box>
      {!floating && label && (
        <InputLabel required={required} sx={{ mb: 2 }}>
          {label}
        </InputLabel>
      )}
      <TextField
        value={fileNames}
        placeholder="No File Chosen"
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={upload}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                <UploadFile />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
          ...props.InputProps
        }}
        InputLabelProps={{
          required: floating && required,
          ...props.InputLabelProps
        }}
      />
      <input type="file" hidden ref={inputRef} {...fileInputProps} />
    </Box>
  );
};

export default AppFileInput;
