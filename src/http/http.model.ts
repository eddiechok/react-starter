export type HttpResponse<T = any> = {
  rst: 0 | 1;
  msg: string;
  data?: T;
};

export type PaginationData = {
  page?: number;
  limit?: number;
};

export type TableHeaderList = {
  key: string;
  name: string;
  align: "left" | "right" | "center";
}[];

export type PaginationResponse<T = any> = {
  current_page: number;
  current_page_items: T[] | null;
  per_page: number;
  total_current_page_items: number;
  total_page: number;
  total_page_items: number;
  table_header_list: TableHeaderList;
};
