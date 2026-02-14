import { compile } from "path-to-regexp";

import { PATH_BASE } from "./uri-path";

const createUri = <P extends object = object>(path: string) => {
  return compile<P>(`${PATH_BASE}api${path}`);
};

export const FE_LOGIN = createUri("/auth/login");
export const FE_LOGIN_VERIFY = createUri("/auth/login/verify");
export const FE_LOGOUT = createUri("/auth/auth/logout");
export const FE_REFRESH = createUri("/auth/auth/refresh");

export const FE_PRODUCTS = createUri("/products");
export const FE_PRODUCTS_CONTACT = createUri("/products/contact");
export const FE_PRODUCTS_IDENTITY = createUri("/products/identity");
