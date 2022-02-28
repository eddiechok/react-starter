import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import useEnhancedQueryOptions from '../../hooks/useEnhancedQueryOptions';
import { checkResponse } from '../../shared/functions';

export type BlockchainDeposit = {
  disp_crypto_addr_status: string;
  ewallet_type_code: string;
  ewallet_type_name: string;
  wallet_type_image_url: string;
  wallet_address: string;
};

export type Wallet = {
  ewallet_type_code: string;
  ewallet_type_name: string;
  currency_code: string;
  wallet_address: string;
  percentage: number;
  balance: number;
  balance_str: string;
  live_rate: number;
  live_rate_str: string;
  converted_balance: number;
  converted_balance_str: string;
  available_balance: number;
  available_balance_str: string;
  available_converted_balance: number;
  available_converted_balance_str: string;
  withholding_balance: number;
  withholding_balance_str: string;
  decimal_point: number;
  setup: {
    deposit_status: number;
    exchange: number;
    transfer_status: number;
    withdraw_status: number;
    app_setting_list: {
      wallet_type_image_url: string;
    };
    blockchain_deposit: BlockchainDeposit[];
  };
};

export type WalletBalance = Wallet[];

const useGetWalletBalance = (
  options?: UseQueryOptions<any, any, WalletBalance>
) => {
  const enhancedOptions = useEnhancedQueryOptions(options);

  const result = useQuery<WalletBalance>(
    'walletBalance',
    () => {
      return axios.get('/member/wallet/balance').then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetWalletBalance;
