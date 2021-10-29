import { Storage } from '@capacitor/storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import useGetAppVersions from '../api/get/useGetAppVersion';
import useGetSettingStatus from '../api/get/useGetSettingStatus';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import MaintenancePage from '../pages/maintenance/MaintenancePage';
import { useLoading } from './LoadingContext';

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

export const AppContextProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckedAuthenticated, setIsCheckedAuthenticated] = useState(false);
  const [isJustLogin, setIsJustLogin] = useState(false);
  const [present, dismiss] = useLoading();
  const appVersions = useGetAppVersions();
  const settingStatus = useGetSettingStatus({
    enabled: false
  });
  const [bypassMaintenance, setBypassMaintenance] = useState(false);

  const login = useCallback(
    (token: string, _bypassMaintenance = false) => {
      Storage.set({ key: 'token', value: token }).then(() => {
        setIsAuthenticated(true);
        // show universal loading spinner with login background
        present();
        settingStatus
          .refetch({ throwOnError: true })
          .then(() => {
            setIsJustLogin(true);
            setBypassMaintenance(_bypassMaintenance);
          })
          .finally(dismiss);
      });
    },
    [dismiss, present, settingStatus.refetch]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    Storage.remove({ key: 'token' });
  }, []);

  const justLoggedIn = useCallback(() => {
    setIsJustLogin(false);
  }, []);

  // check if user has access token when app first launched
  // if has token then call setting status api
  const reloadApp = useCallback(() => {
    Storage.get({ key: 'token' }).then((data) => {
      if (data.value) {
        settingStatus
          .refetch({
            throwOnError: true
          })
          .then(() => {
            setIsAuthenticated(true);
          })
          .catch((error) => {
            if (error?.code === '401') {
              setIsAuthenticated(false);
              Storage.remove({ key: 'token' });
            }
          })
          .finally(() => {
            setIsCheckedAuthenticated(true);
          });
      } else {
        setIsCheckedAuthenticated(true);
      }
    });
  }, [settingStatus.refetch]);

  useEffect(() => {
    reloadApp();
  }, [reloadApp]);

  // show loading spinner without any background
  if (!isCheckedAuthenticated || appVersions.isLoading) {
    return <LoadingOverlay />;
  }

  // if url is not gateway, cant bypass maintenance, maintenance = 1
  if (
    window.location.pathname.search('/gateway/(.+)/(.*)') === -1 &&
    !bypassMaintenance &&
    appVersions.data?.find((row) => row.platform === 'WEB')?.maintenance
  ) {
    return <MaintenancePage />;
  }

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        reloadApp,
        isJustLogin,
        justLoggedIn
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
