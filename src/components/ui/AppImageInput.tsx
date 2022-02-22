import { Box, InputLabel } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export type AppImageInputProps = {
  icon?: string;
  disabled?: boolean;
  fileInputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  fileValue?: File | null;
  label?: string;
  required?: boolean;
};

const AppImageInput = ({
  icon,
  disabled = false,
  required,
  fileInputProps,
  fileValue,
  label
}: AppImageInputProps) => {
  const [currentImage, setCurrentImage] = useState<string>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const upload = () => {
    inputRef.current?.click();
  };

  const onClick = () => {
    if (!disabled) {
      upload();
    }
  };

  useEffect(() => {
    setCurrentImage(fileValue ? URL.createObjectURL(fileValue) : undefined);
  }, [fileValue]);

  return (
    <Box>
      {label && (
        <InputLabel required={required} sx={{ mb: 2 }}>
          {label}
        </InputLabel>
      )}
      <Box
        onClick={onClick}
        sx={{
          position: 'relative',
          pt: '50%',
          border: '1px dashed',
          borderRadius: 4,
          cursor: !disabled ? 'pointer' : 'auto',
          bgcolor: 'grey.200'
        }}
      >
        {!currentImage ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
          >
            {icon && (
              <Box
                component="img"
                src={icon}
                sx={{
                  width: 48,
                  height: 'auto'
                }}
              />
            )}
          </Box>
        ) : (
          <Box
            sx={{
              background: `url(${currentImage}) no-repeat center / contain`,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
          ></Box>
        )}
        <input type="file" hidden ref={inputRef} {...fileInputProps} />
      </Box>
    </Box>
  );
};

export default AppImageInput;
