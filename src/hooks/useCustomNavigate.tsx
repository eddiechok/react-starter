import { useCallback } from 'react';
import {
  NavigateFunction,
  NavigateOptions,
  To,
  useNavigate
} from 'react-router';
import { useLocation } from 'react-router-dom';

type CustomNavigateOptions = NavigateOptions & {
  isModal?: boolean;
};

type CustomNavigateFunction = NavigateFunction & {
  (to: To, options?: CustomNavigateOptions): void;
};

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = useCallback<CustomNavigateFunction>(
    (...args) => {
      if (typeof args[0] === 'number') {
        return navigate(args[0]);
      } else {
        const options = args[1] as CustomNavigateOptions;

        // if currentLocation has backgroundLocation
        // set replace to true
        // if currentLocation has backgroundLocation and new Location is modal
        // set backgroundLocation to currentLocation's backgroundLocation
        // else set backgroundLocation to currentLocation
        return navigate(args[0], {
          ...options,
          replace: !!location.state?.backgroundLocation || options?.replace,
          state: {
            ...options?.state,
            backgroundLocation:
              location.state?.backgroundLocation && options?.isModal // currentLocation has backgroundLocation and new Location is modal
                ? location.state?.backgroundLocation // currentLocation's backgroundLocation
                : options?.isModal
                ? location // current location
                : undefined
          }
        });
      }
    },
    [location, navigate]
  );

  return customNavigate;
};

export default useCustomNavigate;
