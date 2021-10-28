import { useTranslation } from 'react-i18next';
import { UseMutationOptions } from 'react-query';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../contexts/ToastContext';
import commonLabel from '../translation/commonLabel';

const useEnhancedMutationOptions = <
  A extends any,
  B extends any,
  C extends any,
  D extends any
>(
  options?: UseMutationOptions<A, B, C, D>
): UseMutationOptions<A, B, C, D> => {
  const [presentToast] = useToast();
  const { t } = useTranslation();
  const { logout } = useApp();

  return {
    ...options,
    onError: (...args) => {
      const [error]: any[] = args;
      const errorCode = error?.code;
      let errorMsg = error?.message;

      if (errorCode) {
        if (errorCode === '401') {
          errorMsg = t(commonLabel.login_has_expired_please_log_in_again);
          logout();
        } else {
          errorMsg = '';
        }
      }

      presentToast({
        message: errorMsg,
        color: 'error'
      });

      options?.onError && options.onError(...args);
    }
  };
};

export default useEnhancedMutationOptions;
