export type IQuery = Record<string, string | string[] | number | boolean | null | undefined>;

export function objectToQueryParams(query: IQuery) {
  const entries = Object.entries(query);

  return `?${entries
    .map(([key, value]) => (value ? `${key}=${value}` : null))
    .filter(Boolean)
    .join("&")}`;
}

export const escape = (str: string) => str.replace(":", "\\:");
