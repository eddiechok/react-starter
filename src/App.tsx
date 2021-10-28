import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
//@ts-ignore
import tailwindConfigModule from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import { AppContextProvider } from './contexts/AppContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ToastProvider } from './contexts/ToastContext';
import Routes from './routes/Routes';

const tailwindConfig = resolveConfig(tailwindConfigModule) as any;

const theme = createTheme({
  palette: {
    primary: {
      main: tailwindConfig.theme.colors.primary
    },
    secondary: {
      main: tailwindConfig.theme.colors.secondary
    },
    error: {
      main: tailwindConfig.theme.colors.error
    },
    warning: {
      main: tailwindConfig.theme.colors.warning
    },
    info: {
      main: tailwindConfig.theme.colors.info
    },
    success: {
      main: tailwindConfig.theme.colors.success
    }
  },
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
