import axios from 'axios';
import { useQuery } from 'react-query';
import useEnhancedQueryOptions from '../../hooks/useEnhancedQueryOptions';
import { checkResponse } from '../../shared/functions';

type Language = {
  id: string;
  locale: string;
  name: string;
};

const useGetLanguages = () => {
  const enhancedOptions = useEnhancedQueryOptions({
    staleTime: Infinity
  });

  const result = useQuery<Language[]>(
    'languages',
    () => {
      return axios.get('/language/list').then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetLanguages;
