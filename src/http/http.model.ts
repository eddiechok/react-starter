export type HttpResponse<T = any> = {
  rst: 0 | 1;
  msg: string;
  data?: T;
};

export type PaginationData = {
  page?: number;
  limit?: number;
};

export type TableHeader = {
  label_name: string;
  param_name: string;
  show: { filter_param: string; filter_value: string };
  align: 'left' | 'right' | 'center';
};

export type TableSummary = {
  label: string;
  value: any;
};

export type PaginationResponse<T = any> = {
  current_page: number;
  current_page_items: T[] | null;
  per_page: number;
  total_current_page_items: number;
  total_page: number;
  total_page_items: number;
  table_header_list: TableHeader[];
  table_summary_data?: TableSummary[];
};
