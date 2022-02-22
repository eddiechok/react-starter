import { QueryClient } from 'react-query';

/**
 * Setup React Query
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failCount, error: any) => {
        // if is unauthorized, then no need retry, else retry 2 times
        if (error?.code === '401' || failCount + 1 === 2) {
          return false;
        }
        return true;
      }
    }
  }
});
