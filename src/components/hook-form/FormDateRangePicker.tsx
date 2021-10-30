import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Optional } from 'utility-types';
import useErrorMessage from '../../hooks/useErrorMessage';
import { FormInput } from '../../shared/type';
import AppDateRangePicker, {
  AppDateRangePickerProps
} from '../ui/AppDateRangePicker';

export type FormDateRangePickerProps = Optional<
  AppDateRangePickerProps,
  'onChange'
> & {
  from: FormInput;
  to: FormInput;
};

const FormDateRangePicker = ({
  from,
  to,
  ...props
}: FormDateRangePickerProps) => {
  const { control } = useFormContext();

  const fromErrorMessage = useErrorMessage({
    name: from.name,
    msgLabel: from.msgLabel || from.label
  });

  const toErrorMessage = useErrorMessage({
    name: to.name,
    msgLabel: to.msgLabel || to.label
  });

  return (
    <Controller
      name={from.name}
      control={control}
      render={({ field: fromField }) => (
        <Controller
          name={to.name}
          control={control}
          render={({ field: toField }) => (
            <AppDateRangePicker
              dateRange={{
                dateFrom: fromField.value,
                dateTo: toField.value
              }}
              onChange={(dateRange) => {
                fromField.onChange(dateRange.dateFrom);
                toField.onChange(dateRange.dateTo);
              }}
              {...props}
              from={{
                ...from,
                textFieldProps: {
                  error: !!fromErrorMessage,
                  helperText: fromErrorMessage,
                  ...from?.textFieldProps
                }
              }}
              to={{
                ...to,
                textFieldProps: {
                  error: !!toErrorMessage,
                  helperText: toErrorMessage,
                  ...to?.textFieldProps
                }
              }}
            />
          )}
        />
      )}
    />
  );
};

export default FormDateRangePicker;
