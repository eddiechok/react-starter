import { queryClient } from '@/config/query-client';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import AlertDialogProvider from './AlertDialogProvider';
import AppContextProvider from './AppProvider';
import LoadingProvider from './LoadingProvider';
import SecondaryPasswordDialogProvider from './SecondaryPasswordDialogProvider';
import ToastProvider from './ToastProvider';

const Providers: React.FC = ({ children }) => {
  return (
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
  );
};

export default Providers;
