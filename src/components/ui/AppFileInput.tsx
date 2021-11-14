import { UploadFile } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material';
import React, { useMemo, useRef } from 'react';

export type AppFileInputProps = TextFieldProps & {
  fileInputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  fileValue?: FileList | null;
};

const AppFileInput = ({
  fileInputProps,
  fileValue,
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
    <>
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
      />
      <input type="file" hidden ref={inputRef} {...fileInputProps} />
    </>
  );
};

export default AppFileInput;
