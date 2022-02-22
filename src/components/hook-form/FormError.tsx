import useErrorMessage from '@/hooks/useErrorMessage';
import { FormInput } from '@/shared/type';
import { FormHelperText, FormHelperTextProps } from '@mui/material';
import React, { Fragment } from 'react';

type FormErrorProps = FormHelperTextProps & FormInput;

const FormError = ({ name, msgLabel, children, ...props }: FormErrorProps) => {
  const errorMessage = useErrorMessage({
    name,
    msgLabel: msgLabel || props.label
  });

  return (
    <Fragment>
      {children}
      <FormHelperText
        error={!!errorMessage}
        {...props}
        sx={{
          mt: 1,
          ...props.sx
        }}
      >
        {errorMessage}
      </FormHelperText>
    </Fragment>
  );
};

export default FormError;
