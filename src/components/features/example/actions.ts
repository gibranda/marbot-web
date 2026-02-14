"use server";
import { FE_PRODUCTS } from "@/constants/uri-api-frontend";
import { get, post } from "@/libs/ky";
import { objectToQueryParams } from "@/utils/text";

import type { ExampleQuery, ICreateExample, IResponse } from "./types";

export const getExample = async (query: ExampleQuery) => {
  return await get<IResponse>(`${FE_PRODUCTS}${objectToQueryParams(query)}`);
};

export const createExample = async (body: ICreateExample) => {
  return await post<IResponse>(`${FE_PRODUCTS}`, { body: JSON.stringify(body) });
};
