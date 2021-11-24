import { useCallback } from 'react';
import { NavigateFunction, NavigateOptions, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = useCallback<NavigateFunction>(
    (...args) => {
      if (typeof args[0] === 'number') {
        return navigate(args[0]);
      } else {
        const options = args[1] as NavigateOptions;

        // if currentLocation has backgroundLocation
        // set replace to true
        // if currentLocation has backgroundLocation and new Location has backgroundLocation too
        // set backgroundLocation to currentLocation's backgroundLocation
        return navigate(args[0], {
          ...options,
          replace: !!location.state?.backgroundLocation,
          state: {
            ...options?.state,
            backgroundLocation:
              location.state?.backgroundLocation &&
              options?.state?.backgroundLocation
                ? location.state?.backgroundLocation
                : options?.state?.backgroundLocation
          }
        });
      }
    },
    [location]
  );

  return customNavigate;
};

export default useCustomNavigate;
