import { PaginationResponse } from '@/http/http.model';
import { useApp } from '@/providers/AppProvider';
import { useToast } from '@/providers/ToastProvider';
import commonLabel from '@/translation/commonLabel';
import { useTranslation } from 'react-i18next';
import { UseInfiniteQueryOptions } from 'react-query';

const useEnhancedInfiniteQueryOptions = <
  A extends PaginationResponse<any> = PaginationResponse<any>,
  B extends any = any,
  C extends any = any
>(
  options?: UseInfiniteQueryOptions<A, B, C>
): UseInfiniteQueryOptions<A, B, C> => {
  const [presentToast] = useToast();
  const { t } = useTranslation();
  const { logout } = useApp();

  return {
    ...options,
    onError: async (error: any) => {
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
    },
    getNextPageParam: ({ current_page, total_page }) =>
      current_page + 1 <= total_page ? current_page + 1 : false
  };
};

export default useEnhancedInfiniteQueryOptions;
