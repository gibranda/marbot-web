import { BE_PRODUCTS } from "@/constants/uri-api-backend";
import { get } from "@/libs/fetch-node";
import { getAuth, getError } from "@/utils/server";

import { getResponse } from "./model";

import type { IResponse } from "./types";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { search } = request.nextUrl;

  try {
    const response = await get<IResponse>(`${BE_PRODUCTS}${search}`, {
      headers: {
        Authorization: await getAuth(),
      },
    });

    return Response.json(getResponse(response));
  } catch (err) {
    return getError(err, request);
  }
}
