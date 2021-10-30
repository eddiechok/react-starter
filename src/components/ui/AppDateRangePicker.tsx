import { Grid } from '@mui/material';
import { compareDesc } from 'date-fns';
import React from 'react';
import { DateRange } from '../../shared/type';
import AppDatePicker, { AppDatePickerProps } from './AppDatePicker';

export type AppDateRangePickerProps = {
  dateRange?: DateRange;
  onChange: (dateRange: DateRange) => void;
  from?: Omit<AppDatePickerProps, 'value' | 'onChange' | 'minDate' | 'maxDate'>;
  to?: Omit<AppDatePickerProps, 'value' | 'onChange' | 'minDate' | 'maxDate'>;
  minDate?: any;
  maxDate?: any;
};

const AppDateRangePicker = ({
  dateRange,
  onChange,
  from,
  to,
  minDate,
  maxDate
}: AppDateRangePickerProps) => {
  const handleChange = (currentDateRange: DateRange) => {
    const newDateRange = {
      ...dateRange,
      ...currentDateRange
    };

    // and if dateTo < dateFrom, dateFrom = dateTo
    if (
      newDateRange.dateFrom &&
      newDateRange.dateTo &&
      compareDesc(newDateRange.dateFrom, newDateRange.dateTo) < 0
    ) {
      newDateRange.dateTo = newDateRange.dateFrom;
    }

    onChange(newDateRange);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <AppDatePicker
          {...from}
          value={dateRange?.dateFrom}
          onChange={(date) => handleChange({ dateFrom: date as Date | null })}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Grid>
      <Grid item xs={6}>
        <AppDatePicker
          {...to}
          value={dateRange?.dateTo}
          onChange={(date) => handleChange({ dateTo: date as Date | null })}
          minDate={dateRange?.dateFrom || minDate}
          maxDate={maxDate}
        />
      </Grid>
    </Grid>
  );
};

export default AppDateRangePicker;
