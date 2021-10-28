import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ToastProvider } from './contexts/ToastContext';
import Routes from './routes/Routes';
import './styles/global.scss';

const theme = createTheme({
  spacing: 4,
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
        sx: {
          py: 4
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    }
  }
});

/**
 * Setup React Query
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failCount, error: any) => {
        // if is unauthorized, then no need retry, else retry 3 times
        if (error?.code === '401' || failCount + 1 === 3) {
          return false;
        }
        return true;
      }
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <ToastProvider>
            <AppContextProvider>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </AppContextProvider>
          </ToastProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
