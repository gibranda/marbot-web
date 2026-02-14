import is from "@sindresorhus/is";
import { getProperty } from "dot-prop";

export function isNill<TValue = unknown>(value: TValue) {
  return is.nullOrUndefined(value);
}
export function isNumber<TValue = unknown>(value: TValue) {
  return is.number(value);
}
export function isNumeric<TValue = unknown>(value: TValue) {
  return is.numericString(value);
}
export function isString<TValue = unknown>(value: TValue) {
  return is.string(value);
}
export function isArray<TValue = unknown>(value: TValue) {
  return is.array(value);
}
export function isBoolean<TValue = unknown>(value: TValue) {
  return is.boolean(value);
}
export function isPlainObject<TValue = unknown>(value: TValue) {
  return is.plainObject(value);
}
export function isEmptyObject<TValue = unknown>(value: TValue) {
  return is.emptyObject(value);
}
export function isNonEmptyObject<TValue = unknown>(value: TValue) {
  return is.nonEmptyObject(value);
}

export function ensureString<TValue = unknown>(value: TValue, defaultValue: string) {
  return isString(value) ? value : defaultValue;
}
export function ensureNumeric<TValue = unknown>(value: TValue, defaultValue: string) {
  if (isNumeric(value)) {
    return value;
  }

  return defaultValue;
}
export function ensureNumber<TValue = unknown>(value: TValue, defaultValue: number | null = null) {
  return isNumber(value) ? value : defaultValue;
}
export function ensureBoolean<TValue = unknown>(value: TValue, defaultValue: boolean) {
  return isBoolean(value) ? value : defaultValue;
}
export function ensureArray<TValue = unknown, TEntry = unknown>(value: TValue, defaultValue: Array<TEntry>) {
  return isArray(value) ? value : defaultValue;
}
export function ensureObject<TValue = unknown>(value: TValue, defaultValue: object) {
  return isNonEmptyObject(value) ? value : defaultValue;
}
export function ensureDate<TValue = unknown, TDefault = Date | string>(value: TValue, defaultValue: TDefault) {
  return isArray(value) ? value : defaultValue;
}

export function objectData<TData>(obj: TData) {
  return {
    getString(path: string, defaultValue: string = "") {
      const value = getProperty(obj, path);

      return ensureString<typeof value>(value, defaultValue);
    },
    getNumeric(path: string, defaultValue: string = "0") {
      const value = getProperty(obj, path);

      return ensureNumeric<typeof value>(value, defaultValue);
    },
    getNumber(path: string, defaultValue: number | null = null) {
      const value = getProperty(obj, path);

      return ensureNumber<typeof value>(value, defaultValue);
    },
    getBoolean(path: string, defaultValue: boolean = false) {
      const value = getProperty(obj, path);

      return ensureBoolean<typeof value>(value, defaultValue);
    },
    getArray<TEntry = string[]>(path: string, defaultValue: Array<TEntry> = []) {
      const value = getProperty(obj, path);

      return ensureArray<typeof value>(value, defaultValue) as Array<TEntry>;
    },
    getObject<TValue = unknown>(path: string, defaultValue: object = {}) {
      const value = getProperty(obj, path);

      return ensureObject<typeof value>(value, defaultValue) as TValue;
    },
    getValueOrNull<TValue = unknown>(path: string) {
      const value = getProperty(obj, path);

      return !isNill(value) ? (value as TValue) : null;
    },
  };
}

export function isJSON(value: string) {
  try {
    JSON.parse(value);
  } catch {
    return false;
  }

  return true;
}

export function parseJSON<T = unknown>(value: string, fallback?: T) {
  try {
    return JSON.parse(value) as T;
  } catch {
    return value || fallback;
  }
}
