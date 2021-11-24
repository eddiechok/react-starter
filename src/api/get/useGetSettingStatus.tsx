import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import useEnhancedQueryOptions from '../../hooks/useEnhancedQueryOptions';
import { checkResponse } from '../../shared/functions';

type SettingStatus = {
  username: string;
  avatar?: string;
};

const useGetSettingStatus = (
  options?: UseQueryOptions<any, any, SettingStatus>
) => {
  const enhancedOptions = useEnhancedQueryOptions({
    staleTime: Infinity,
    retry: false,
    ...options
  });

  const result = useQuery<SettingStatus>(
    'settingStatus',
    () => {
      return axios.get('/member/setting/status').then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetSettingStatus;
