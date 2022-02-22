import useEnhancedQueryOptions from '@/hooks/useEnhancedQueryOptions';
import { checkResponse } from '@/shared/functions';
import axios from 'axios';
import { useQuery } from 'react-query';

type AppVersion = {
  platform: string;
  maintenance: string;
};

const useGetAppVersions = () => {
  const enhancedOptions = useEnhancedQueryOptions({
    staleTime: Infinity
  });

  const result = useQuery<AppVersion[]>(
    'appVersion',
    () => {
      return axios
        .get('/app-version/list', {
          params: {
            latest: 1
          }
        })
        .then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetAppVersions;
