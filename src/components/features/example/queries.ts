import { infiniteQueryOptions, queryOptions, useMutation } from "@tanstack/react-query";

import { QUERY_EXAMPLE } from "@/constants/query-key";

import { createExample, getExample } from "./actions";

import type { ExampleQuery } from "./types";

export const ExampleKeys = {
  all: () => [QUERY_EXAMPLE],
  infiniteLists: () => [...ExampleKeys.all(), "INFINITE_LISTS"],
  infiniteList: (query: ExampleQuery) =>
    infiniteQueryOptions({
      queryKey: [...ExampleKeys.infiniteLists(), query],
      queryFn: ({ pageParam }) => getExample({ ...query, skip: pageParam.toString() }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.products.length < 5) {
          return undefined;
        }

        return lastPage.skip + 5;
      },
    }),
  details: (query: ExampleQuery) =>
    queryOptions({
      queryKey: [...ExampleKeys.all(), query],
      queryFn: () => getExample(query),
    }),
};

export function useCreateExample() {
  return useMutation({ mutationFn: createExample });
}
