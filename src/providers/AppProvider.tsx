import { Storage } from '@capacitor/storage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import { useQueryClient } from 'react-query';
import useGetAppVersions from '../api/get/useGetAppVersion';
import useGetSettingStatus from '../api/get/useGetSettingStatus';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import getTheme from '../config/theme';
import MaintenancePage from '../pages/maintenance/MaintenancePage';
import { useLoading } from './LoadingProvider';

type AppContextProps = {
  login: (token: string, bypassMaintenance?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  reloadApp: () => void;
  isJustLogin: boolean;
  justLoggedIn: () => void;
};

const AppContext = createContext<AppContextProps>({
  login: () => void 0,
  logout: () => void 0,
  isAuthenticated: false,
  reloadApp: () => void 0,
  isJustLogin: false,
  justLoggedIn: () => void 0
});

export const useApp = () => useContext(AppContext);

type AppState = {
  isAuthenticated: boolean;
  isCheckedAuthenticated: boolean;
  isJustLogin: boolean;
  bypassMaintenance: boolean;
};

type AppAction = {
  type: 'login' | 'logout' | 'justLoggedIn' | 'checkAuth';
  payload?: {
    bypassMaintenance?: boolean;
    isAuthenticated?: boolean;
  };
};

const initialAppState: AppState = {
  isAuthenticated: false,
  isCheckedAuthenticated: false,
  isJustLogin: false,
  bypassMaintenance: false
};

const appReducer: Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        isAuthenticated: true,
        isJustLogin: true,
        isCheckedAuthenticated: true,
        bypassMaintenance:
          action.payload?.bypassMaintenance !== undefined
            ? action.payload?.bypassMaintenance
            : state.bypassMaintenance
      };
    }
    case 'logout': {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    case 'justLoggedIn': {
      return {
        ...state,
        isJustLogin: false
      };
    }
    case 'checkAuth': {
      return {
        ...state,
        isAuthenticated:
          action.payload?.isAuthenticated !== undefined
            ? action.payload?.isAuthenticated
            : state.isAuthenticated,
        isCheckedAuthenticated: true
      };
    }
    default:
      return state;
  }
};

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const [presentLoading, dismissLoading] = useLoading();
  const appVersions = useGetAppVersions();
  const settingStatus = useGetSettingStatus({
    enabled: false
  });
  const { refetch: refetchSettingStatus } = settingStatus;
  const queryClient = useQueryClient();
  const theme = useMemo(() => getTheme(), []);

  const login = useCallback(
    (token: string, _bypassMaintenance = false) => {
      Storage.set({ key: 'token', value: token }).then(() => {
        // show universal loading spinner with login background
        presentLoading();
        refetchSettingStatus({ throwOnError: true })
          .then(() => {
            dispatch({
              type: 'login',
              payload: {
                bypassMaintenance: _bypassMaintenance
              }
            });
          })
          .finally(dismissLoading);
      });
    },
    [dismissLoading, presentLoading, refetchSettingStatus]
  );

  const logout = useCallback(() => {
    dispatch({ type: 'logout' });
    Storage.remove({ key: 'token' });
    queryClient.clear();
  }, [queryClient]);

  const justLoggedIn = useCallback(() => {
    dispatch({ type: 'justLoggedIn' });
  }, []);

  // check if user has access token when app first launched
  // if has token then call setting status api
  const reloadApp = useCallback(() => {
    Storage.get({ key: 'token' }).then((data) => {
      if (data.value) {
        refetchSettingStatus({
          throwOnError: true
        })
          .then(() => {
            dispatch({
              type: 'checkAuth',
              payload: {
                isAuthenticated: true
              }
            });
          })
          .catch((error) => {
            if (error?.code === '401') {
              Storage.remove({ key: 'token' });

              dispatch({
                type: 'checkAuth',
                payload: {
                  isAuthenticated: false
                }
              });
            }
          });
      } else {
        dispatch({ type: 'checkAuth' });
      }
    });
  }, [refetchSettingStatus]);

  useEffect(() => {
    // if url is not gateway
    window.location.pathname.search('/gateway/(.+)/(.*)') === -1 && reloadApp();
  }, [reloadApp]);

  // show loading spinner without any background
  if (
    window.location.pathname.search('/gateway/(.+)/(.*)') === -1 &&
    (!state.isCheckedAuthenticated || appVersions.isLoading)
  ) {
    return <LoadingOverlay />;
  }

  // if url is not gateway, cant bypass maintenance, maintenance = 1
  if (
    window.location.pathname.search('/gateway/(.+)/(.*)') === -1 &&
    !state.bypassMaintenance &&
    appVersions.data?.find((row) => row.platform === 'WEB')?.maintenance
  ) {
    return <MaintenancePage />;
  }

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        isAuthenticated: state.isAuthenticated,
        reloadApp,
        isJustLogin: state.isJustLogin,
        justLoggedIn
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
