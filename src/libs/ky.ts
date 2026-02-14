import ky from "ky";

import { FE_LOGOUT, FE_REFRESH } from "@/constants/uri-api-frontend";
import { PATH_BASE } from "@/constants/uri-path";

import type { IHttpBodyType, IHttpMethod } from "./http-utilities";
import type { Options as KyOptions, KyResponse } from "ky";

export interface IRequestOptions extends KyOptions {
  responseType?: IHttpBodyType;
}

const sharedKyRequestOptions: IRequestOptions = {
  responseType: "json",
  timeout: 60000, // 60 seconds
  retry: {
    limit: 1,
    statusCodes: [401],
    methods: ["post", "get", "put", "patch", "delete"],
  },
  hooks: {
    beforeRetry: [
      async () => {
        const uriRefresh = FE_REFRESH();
        const urlLogout = FE_LOGOUT();
        try {
          await ky.get(uriRefresh);
        } catch {
          await ky.delete(urlLogout);
          window.location.href = PATH_BASE;
        }
      },
    ],
    // beforeRequest: [ // Digunakan jika tidak menggunakan API SSR
    //   async request => {
    //     const token = await getCookie(COOKIES.TOKEN);
    //     if (token) {
    //       request.headers.set("Authorization", token);
    //     }
    //     return request;
    //   },
    // ],
    // beforeError: [
    //   async (error: HTTPError & { isToaster?: boolean }) => {
    //     const { response } = error;
    //     const contentType = response.headers.get("content-type");
    //     if (contentType && contentType.includes("application/json")) {
    //       try {
    //         const res: { message: string; isToaster?: boolean } = await response.json();
    //         error.message = res?.message ?? response.statusText;
    //         error.isToaster = res?.isToaster ?? true;
    //       } catch (err) {
    //         error.message = err as string;
    //         error.isToaster = true;
    //       }
    //       return error;
    //     }
    //     error.message = response.statusText;
    //     error.isToaster = true;
    //     return error;
    //   },
    // ],
  },
};

export function getRequestOptions(requestOptions?: IRequestOptions): IRequestOptions {
  return {
    ...sharedKyRequestOptions,
    ...(requestOptions ?? {}),
  };
}

export async function sendRequest<TResource>(method: IHttpMethod, url: string, requestOptions?: IRequestOptions) {
  switch (method) {
    case "GET":
      return await ky.get<TResource>(url, requestOptions);

    case "POST":
      return await ky.post<TResource>(url, requestOptions);

    case "PUT":
      return await ky.put<TResource>(url, requestOptions);

    case "PATCH":
      return await ky.patch<TResource>(url, requestOptions);

    case "DELETE":
      return await ky.delete<TResource>(url, requestOptions);
  }
}

export async function getResponse<TResource>(response: KyResponse, responseType: IHttpBodyType) {
  switch (responseType) {
    case "text":
      return (await response.text()) as TResource;

    case "json":
      return (await response.json()) as TResource;

    case "blob":
      return (await response.blob()) as TResource;

    case "arraybuffer":
      return (await response.arrayBuffer()) as TResource;

    default:
      return response as TResource;
  }
}

export const httpRequest = async <TResource>(method: IHttpMethod, url: string, requestOptions?: IRequestOptions) => {
  const options = getRequestOptions(requestOptions);
  const response = await sendRequest<TResource>(method, url, options);

  return getResponse<TResource>(response, options.responseType ?? "json");
};

export async function get<TResource>(url: string, requestOptions?: IRequestOptions) {
  return httpRequest<TResource>("GET", url, requestOptions);
}

export async function post<TResource>(url: string, requestOptions?: IRequestOptions) {
  return httpRequest<TResource>("POST", url, requestOptions);
}

export async function put<TResource>(url: string, requestOptions?: IRequestOptions) {
  return httpRequest<TResource>("PUT", url, requestOptions);
}

export async function patch<TResource>(url: string, requestOptions?: IRequestOptions) {
  return httpRequest<TResource>("PATCH", url, requestOptions);
}

export async function _delete<TResource>(url: string, requestOptions?: IRequestOptions) {
  return httpRequest<TResource>("DELETE", url, requestOptions);
}
