import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import useEnhancedQueryOptions from '../../hooks/useEnhancedQueryOptions';
import { checkResponse } from '../../shared/functions';

export type WithdrawTo = {
  min: number;
  max: number;
  admin_fee_perc: number;
  ewallet_type_code_to: string;
  ewallet_type_name_to: string;
  currency_code: string;
};

export type WithdrawSetting = {
  ewallet_type_code: string;
  ewallet_type_name: string;
  currency_code: string;
  withdraw_to: WithdrawTo[];
};

export type WithdrawSettingParams = {
  ewallet_type_code: string;
};

const useGetWithdrawSetting = (
  params: WithdrawSettingParams,
  options?: UseQueryOptions<any, any, WithdrawSetting>
) => {
  const enhancedOptions = useEnhancedQueryOptions(options);

  const result = useQuery<WithdrawSetting>(
    ['withdrawSetting', params],
    () => {
      return axios
        .get('/member/wallet/withdraw-setting', { params })
        .then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetWithdrawSetting;
