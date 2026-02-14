import { objectData } from "@/libs/value";

import type { IResponseActivation, IResponseKeyla, IResponseLogin, IResponseLoginOtp } from "./types";

export function getResponseLogin(response: IResponseLogin) {
  const oData = objectData(response);

  return {
    success: oData.getBoolean("success"),
    code: oData.getString("code"),
    message: oData.getString("message"),
    data: {
      token: `${oData.getString("data.token_type")} ${oData.getString("data.access_token")}`,
      expiredAt: oData.getNumber("data.expired_at"),
      refreshToken: oData.getString("data.refresh_token"),
    },
  };
}
export type IResultLogin = ReturnType<typeof getResponseLogin>;

export function getResponseActivation(response: IResponseActivation) {
  const oData = objectData(response);

  return {
    success: oData.getBoolean("success"),
    code: oData.getString("code"),
    message: oData.getString("message"),
    data: {
      isActive: oData.getBoolean("data.is_active"),
      userId: oData.getString("data.user_id"),
    },
  };
}
export type IResultActivation = ReturnType<typeof getResponseActivation>;

export function getResponseKeyla(response: IResponseKeyla) {
  const oData = objectData(response);

  return {
    success: oData.getBoolean("success"),
    code: oData.getString("code"),
    message: oData.getString("message"),
    data: {
      qrImage: oData.getString("data.qr_image_path"),
    },
  };
}
export type IResultKeyla = ReturnType<typeof getResponseKeyla>;

export function getResponseLoginOtp(response: IResponseLoginOtp) {
  const oData = objectData(response);

  return {
    success: oData.getBoolean("success"),
    code: oData.getString("code"),
    message: oData.getString("message"),
    data: {
      second: oData.getNumber("data.next_request_second"),
    },
  };
}
export type IResultLoginOtp = ReturnType<typeof getResponseLoginOtp>;
