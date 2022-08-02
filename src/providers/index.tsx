import { queryClient } from '@/config/query-client';
import { LOCALE_MAP } from '@/shared/constants';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClientProvider } from 'react-query';
import AlertDialogProvider from './AlertDialogProvider';
import AppContextProvider from './AppProvider';
import LoadingProvider from './LoadingProvider';
import SecondaryPasswordDialogProvider from './SecondaryPasswordDialogProvider';
import ToastProvider from './ToastProvider';

const Providers: React.FC = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={LOCALE_MAP[i18n.languages[0]]}
    >
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <ToastProvider>
            <AppContextProvider>
              <SecondaryPasswordDialogProvider>
                <AlertDialogProvider>{children}</AlertDialogProvider>
              </SecondaryPasswordDialogProvider>
            </AppContextProvider>
          </ToastProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default Providers;
