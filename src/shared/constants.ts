import { subDays } from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import zhLocale from 'date-fns/locale/zh-CN';
import * as yup from 'yup';
import { DateRange } from './type';

export const Yup = yup;

export const SYSTEM_DATE_FORMAT = 'dd/MM/yyyy';
export const API_DATE_FORMAT = 'yyyy-MM-dd';

export const defaultDateRange: DateRange = {
  dateFrom: subDays(new Date(), 3),
  dateTo: new Date()
};

export const DRAWER_WIDTH = 260;

export const HAS_SIDEBAR = true;

export const FLOATING_LABEL = false;

export const LOCALE_MAP: any = {
  en: enLocale,
  zh: zhLocale
};
