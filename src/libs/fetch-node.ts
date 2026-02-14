import { AbstractError, createErrorClass } from "./error";
import { isJSON, isString, isPlainObject, parseJSON } from "./value";

import type { InstanceOptions } from "./error";
import type { IHttpBodyType, IHttpMethod, IPayloadContent, IPayloadDetail } from "./http-utilities";

export interface IRequestOptions extends RequestInit {
  responseType?: IHttpBodyType;
}

// Module constants section
export const E_API_UNEXPECTED = "Unexpected frontend API error" as const;

// Module errors section
export interface IApiErrorOptions extends InstanceOptions {
  payloadClient?: IPayloadDetail;
  payloadSent?: IPayloadDetail;
  payloadReceived?: IPayloadContent;
}

export const ApiError = createErrorClass("ApiError", {
  custom: class extends AbstractError {
    constructor(message: string, options?: IApiErrorOptions) {
      super(message, {
        ...options,
        ...{
          props: {
            payloadClient: options?.payloadClient ?? null,
            payloadSent: options?.payloadSent ?? null,
            payloadReceived: options?.payloadReceived ?? null,
          },
        },
      });
    }
  },
});

// Function readReceivedResponse
export async function getResponse<TResponse>(response: Response, responseType?: IHttpBodyType) {
  const E_MESSAGE = "Failed to read received backend response";

  if (!response.ok) {
    const text = await response.text();
    const json = parseJSON<string | { message: string | undefined }>(text, response.statusText);
    const message = typeof json === "string" ? json : (json?.message ?? response.statusText);

    throw new ApiError(`${E_MESSAGE}: ${message}`, {
      payloadReceived: {
        httpStatus: response.status,
        headers: response.headers,
        body: text,
      },
    });
  }

  const responseContentType = response.headers.get("Content-Type");

  if (!responseContentType) {
    throw new ApiError(`${E_MESSAGE}: Unknown Content-Type "${responseContentType}"`, {
      payloadReceived: {
        httpStatus: response.status,
        headers: response.headers,
      },
    });
  }

  try {
    switch (responseType) {
      case "text":
        return (await response.text()) as TResponse;

      case "json":
        return (await response.json()) as TResponse;

      case "blob":
        return (await response.blob()) as TResponse;

      case "arraybuffer":
        return (await response.arrayBuffer()) as TResponse;

      default:
        return response as TResponse;
    }
  } catch (cause) {
    throw new ApiError(E_MESSAGE, {
      cause,
      payloadReceived: {
        httpStatus: response.status,
        headers: response.headers,
      },
    });
  }
}

// Function requestBackend
export async function requestBackend<TResource>(method: IHttpMethod, url: string | URL, options?: IRequestOptions) {
  const requestOptions = { ...(options ?? {}) };

  requestOptions.method = method;
  requestOptions.headers = requestOptions?.headers ?? {};

  const contentTypeFn = (value: string, utf8: boolean = true) => ({
    "Content-Type": `${value}${utf8 ? "; charset=utf-8" : ""}`,
  });

  // plain string (not JSON string) in body
  if (isString(requestOptions?.body) && !isJSON(requestOptions?.body)) {
    requestOptions.headers = { ...requestOptions.headers, ...contentTypeFn("text/plain") };
  }

  // auto convert object in body as JSON
  if (isPlainObject(requestOptions?.body)) {
    requestOptions.headers = { ...requestOptions.headers, ...contentTypeFn("application/json") };
    requestOptions.body = JSON.stringify(requestOptions?.body);
  }

  const response = await fetch(url, requestOptions);

  return getResponse<TResource>(response, options?.responseType ?? "json");
}

export async function get<TData>(url: string, options?: IRequestOptions) {
  return requestBackend<TData>("GET", url, options);
}

export async function post<TData>(url: string, options?: IRequestOptions) {
  return requestBackend<TData>("POST", url, options);
}

export async function put<TData>(url: string, options?: IRequestOptions) {
  return requestBackend<TData>("PUT", url, options);
}

export async function patch<TData>(url: string, options?: IRequestOptions) {
  return requestBackend<TData>("PATCH", url, options);
}

export async function _delete<TData>(url: string, options?: IRequestOptions) {
  return requestBackend<TData>("DELETE", url, options);
}
