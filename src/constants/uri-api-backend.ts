import { compile } from "path-to-regexp";

import { URL_API } from "./env";

const createUri = <P extends Record<string, string>>(path: string) => {
  return compile<P>(`${URL_API}${path}`);
};

export const BE_LOGIN = createUri("/v1/auth/login");
export const BE_LOGIN_VERIFY = createUri("/v1/auth/login/verify");

export const BE_PRODUCTS = createUri("/v1/products");
export const BE_PRODUCTS_CONTACT = createUri("/v1/products/contact");
export const BE_PRODUCTS_IDENTITY = createUri("/v1/products/identity");
