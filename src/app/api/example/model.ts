import { objectData } from "@/libs/value";

import type { IProduct, IResponse } from "./types";

export function getResponse(response: IResponse) {
  const oData = objectData(response);
  const product = oData.getArray<IProduct>("products");

  function mapProduct(product: IProduct) {
    const oProduct = objectData(product);

    return {
      title: oProduct.getString("title"),
    };
  }

  return {
    status: oData.getNumber("status"),
    error: oData.getBoolean("error"),
    message: oData.getString("message"),
    data: product.map(mapProduct),
    meta: {
      total: oData.getNumber("total"),
      skip: oData.getNumber("skip"),
      limit: oData.getNumber("limit"),
    },
  };
}
export type IResult = ReturnType<typeof getResponse>;
