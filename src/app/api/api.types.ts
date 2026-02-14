export interface IBackendQuerySearchParams {
  page: number;
  per_page: number;
  keyword: string;
}

export interface IBackendResource<TReceivedData = unknown, TReceivedMetadata = unknown> {
  success: boolean;
  code: string;
  message: string;
  data: TReceivedData | null;
  meta?: TReceivedMetadata | null | undefined;
}

export interface IReceivedMetadata {
  item_count: number;
  page: {
    is_cursor: boolean;
    current: number;
    previous: number;
    next: number;
    limit: number;
    page: number;
    total_page: number;
    total: number;
  };
  cursors: {
    next: string;
    previous: string;
  };
  sort?: {
    asc: string[] | null;
    desc: string[] | null;
  };
}

export type IBackendResourceList<TData = null> = IBackendResource<TData, IReceivedMetadata>;
