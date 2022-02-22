import useEnhancedQueryOptions from '@/hooks/useEnhancedQueryOptions';
import { checkResponse } from '@/shared/functions';
import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

export type DownlineList = {
  downline_username: string;
  date_joined: string;
  rank: string;
  profile_img_url: string;
  children_status: number;
  referral_by: string;
  extra_list: {
    translated_label: string;
    label_value: string;
  }[];
  children?: DownlineList[];
};

type TreeList = {
  total_direct_sponsor: string;
  total_level: string;
  today_total_new_member: string;
  today_total_sales: string;
  total_sales: string;
  total_network: number;
  total_performance: string;
  total_p2p_small_network_sales: string;
  total_p2p_sales: string;
  today_p2p_sales: string;
  downline_list?: DownlineList[];
};

export type TreeListParams = {
  inc_down_mem?: number;
  inc_mem?: number;
  level?: number;
  downline_username?: string;
};

const useGetTreeList = (
  params?: TreeListParams,
  options?: UseQueryOptions<any, any, TreeList>
) => {
  const enhancedOptions = useEnhancedQueryOptions(options);

  const result = useQuery<TreeList>(
    ['treeList', params],
    () => {
      return axios.get('/member/tree/list', { params }).then(checkResponse);
    },
    enhancedOptions
  );

  return result;
};

export default useGetTreeList;
