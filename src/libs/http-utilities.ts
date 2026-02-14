// Module types section
export type IHttpUriParam<T = Record<string, string>> = T;
export type IHttpQueryString<T = Record<string, string>> = T;
export type IHttpHeaders<T = HeadersInit> = T;
export type IHttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type IHttpBody<T = BodyInit> = T;
export type IHttpBodyType = "text" | "json" | "blob" | "arraybuffer" | "default";
export interface IPayloadEndpoint {
  url: string;
  params?: IHttpUriParam;
  queries?: IHttpQueryString;
}
export interface IPayloadContent {
  httpStatus: number;
  headers: IHttpHeaders;
  body?: IHttpBody;
}
export type IPayloadDetail = IPayloadEndpoint & IPayloadContent;
export interface IPayloadResponse<TData = unknown> {
  error: boolean;
  status: number;
  code: string;
  message: string;
  data?: TData;
}
export interface INotifiable {
  isNotifiable: boolean;
}
