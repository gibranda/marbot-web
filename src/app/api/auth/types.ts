import type { IBackendResource } from "../api.types";

type ILogin = {
  access_token: string;
  expired_at: number;
  token_type: string;
  refresh_token: string;
  can_access_mobile?: boolean;
};
export type IResponseLogin = IBackendResource<ILogin>;

type IActivation = {
  is_active: boolean;
  user_id: string;
};
export type IResponseActivation = IBackendResource<IActivation>;

type IKeyla = {
  qr_image_path: string;
};
export type IResponseKeyla = IBackendResource<IKeyla>;

type ILoginOtp = {
  next_request_second: number;
};
export type IResponseLoginOtp = IBackendResource<ILoginOtp>;
