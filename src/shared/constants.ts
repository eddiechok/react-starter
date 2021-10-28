import { format, subDays } from 'date-fns';
import * as yup from 'yup';
import { DateRange } from './type';

export const defaultDateRange: DateRange = {
  dateFrom: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
  dateTo: format(new Date(), 'yyyy-MM-dd')
};

export const Yup = yup;
