import axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import useEnhancedMutationOptions from '../../hooks/useEnhancedMutationOptions';
import { HttpResponse } from '../../http/http.model';
import { checkPostResponse, encrypt } from '../../shared/functions';

export type WithdrawParams = {
  amount: number;
  address: string;
  secondary_pin: string;
  ewallet_type_code: string;
  ewallet_type_code_to: string;
};

type WithdrawResponse = HttpResponse<{
  address_to: string;
  amount: number;
  ewallet_type: string;
  ewallet_type_to: string;
  gas_fee: string;
  payment: string;
  remark: string;
  tran_hash: string;
  trans_time: string;
}>;

const postWithdraw = (params: WithdrawParams) => {
  return axios
    .post('/member/wallet/withdraw', {
      ...params,
      secondary_pin: encrypt(params.secondary_pin)
    })
    .then<WithdrawResponse>(checkPostResponse);
};

const usePostWithdraw = (
  options?: UseMutationOptions<WithdrawResponse, Error, WithdrawParams>
) => {
  const enhancedOptions = useEnhancedMutationOptions(options);
  const mutation = useMutation(postWithdraw, enhancedOptions);

  return mutation;
};

export default usePostWithdraw;
