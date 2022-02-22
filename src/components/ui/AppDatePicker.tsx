import { SYSTEM_DATE_FORMAT } from '@/shared/constants';
import commonLabel from '@/translation/commonLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { format } from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import zhLocale from 'date-fns/locale/zh-CN';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Optional } from 'utility-types';

const localeMap: any = {
  en: enLocale,
  zh: zhLocale
};

export type AppDatePickerProps = Optional<DatePickerProps, 'renderInput'> & {
  textFieldProps?: TextFieldProps;
};

const AppDatePicker = React.forwardRef<
  HTMLDivElement | null,
  AppDatePickerProps
>(({ textFieldProps, ...props }, ref) => {
  const { t, i18n } = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');

  // set error message for invalid date, min date, and max date
  const handleError = (
    reason:
      | 'shouldDisableDate'
      | 'disablePast'
      | 'disableFuture'
      | 'minDate'
      | 'maxDate'
      | 'invalidDate'
      | null
  ) => {
    if (reason === 'invalidDate') {
      setErrorMessage(
        t(commonLabel.invalid_TYPE_format, {
          type: t(commonLabel.date)
        })
      );
    } else if (reason === 'minDate') {
      props.minDate &&
        setErrorMessage(
          t(commonLabel.date_must_be_later_than_MIN, {
            min: format(props.minDate as Date, SYSTEM_DATE_FORMAT)
          })
        );
    } else if (reason === 'maxDate') {
      props.maxDate &&
        setErrorMessage(
          t(commonLabel.date_must_be_earlier_than_MAX, {
            max: format(props.maxDate as Date, SYSTEM_DATE_FORMAT)
          })
        );
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.languages[0]]}
    >
      <DatePicker
        {...props}
        ref={ref}
        onError={handleError}
        okText={props.okText || t(commonLabel.confirm)}
        cancelText={props.cancelText || t(commonLabel.cancel)}
        inputFormat={SYSTEM_DATE_FORMAT}
        renderInput={(params) => {
          return props.renderInput ? (
            props.renderInput(params)
          ) : (
            <TextField
              {...params}
              {...textFieldProps}
              error={textFieldProps?.error || params.error}
              helperText={
                textFieldProps?.helperText !== undefined
                  ? textFieldProps.helperText
                  : params.error && errorMessage
              }
            />
          );
        }}
      />
    </LocalizationProvider>
  );
});

export default AppDatePicker;
