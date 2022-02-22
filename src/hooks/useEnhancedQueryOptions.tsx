import { useTranslation } from 'react-i18next';
import { UseQueryOptions } from 'react-query';
import { useApp } from '../providers/AppProvider';
import { useToast } from '../providers/ToastProvider';
import commonLabel from '../translation/commonLabel';

const useEnhancedQueryOptions = <
  A extends any = any,
  B extends any = any,
  C extends any = any
>(
  options?: UseQueryOptions<A, B, C>
): UseQueryOptions<A, B, C> => {
  const [presentToast] = useToast();
  const { t } = useTranslation();
  const { logout } = useApp();

  return {
    ...options,
    onError: (error: any) => {
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
      options?.onError && options.onError(error);
    }
  };
};

export default useEnhancedQueryOptions;
