import { escape } from "@/utils/text";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const URL_APP = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const URL_API = escape(process.env.URL_API || "https://dummyjson.com");
