import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import useEnhancedQueryOptions from '../../hooks/useEnhancedQueryOptions';
import { checkResponse } from '../../shared/functions';

export type ActiveOrder = {
  amount: number;
  converted_amount: number;
  expiry_at: number;
  crypto_address: string;
};

export type CryptoDetail = {
  rate: number;
  setup: {
    min: number;
    max: number;
    from_currency: string;
    to_currency: string;
    decimal_from: number;
    decimal_to: number;
  };
  active_order: ActiveOrder | null;
  lock: number;
};

export type CryptoDetailParams = {
  crypto_code: string; //from
  ewallet_type_code: string; //to
};

const useGetCryptoDetail = (
  params?: CryptoDetailParams,
  options?: UseQueryOptions<any, any, CryptoDetail>
) => {
  const enhancedOptions = useEnhancedQueryOptions(options);

  const result = useQuery<CryptoDetail>(
    ['cryptoDetail', params],
    () => {
      return axios.get('/member/crypto/get', { params }).then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetCryptoDetail;
