export type Nullable<T> = T | null | undefined;

export type IResponse<D = null, M = unknown> = {
  success: boolean;
  code: string;
  message: string;
  data: Nullable<D>;
  meta?: Nullable<M>;
};
