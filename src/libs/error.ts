import ModernError from "modern-errors";

export type * from "modern-errors";

// Module types section
export type IErrorCode = { contexts: Array<string>; httpStatus?: number; external?: string };
export type IErrorMessage = IErrorCode & { message: string };

// Module constants section
const E_SPLIT_CONTEXT = ".";
const E_SPLIT_HTTP_STATUS = "~";
const E_SPLIT_EXTERNAL = "#";

// Module functions section
export function createCode(info: IErrorCode) {
  let context = info.contexts.join(E_SPLIT_CONTEXT);

  if (info.httpStatus) {
    context += `${E_SPLIT_HTTP_STATUS}${info.httpStatus}`;
  }

  if (info.external) {
    context += `${E_SPLIT_EXTERNAL}${info.external}`;
  }

  return context;
}

export function createErrorMessage(info: IErrorMessage) {
  const code = createCode(info);

  return `[${code}] ${info.message}`;
}

export const AbstractError = ModernError;
export const createErrorClass = ModernError.subclass;
