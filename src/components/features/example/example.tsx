"use client";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

import { ExampleKeys, useCreateExample } from "./queries";

export function Example() {
  const queryExample = useSuspenseQuery(ExampleKeys.details({ limit: "5", skip: "0" }));
  const queryInfinite = useSuspenseInfiniteQuery(ExampleKeys.infiniteList({ limit: "5", skip: "0" }));
  const mutateCreateExample = useCreateExample();

  function onCreate() {
    mutateCreateExample.mutate({
      title: "test",
    });
  }

  return (
    <div>
      <h2 className="text-xl">List</h2>
      {queryExample.data.products.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}

      <h2 className="mt-5 text-xl">List Infinite</h2>
      {queryInfinite.data?.pages
        .map((page) => page.products ?? [])
        .flat()
        .map((product) => (
          <p key={product.id}>{product.title}</p>
        ))}
      {queryInfinite.hasNextPage ? (
        <p className="cursor-pointer text-blue-500" onClick={() => queryInfinite.fetchNextPage()}>
          Lihat lebih banyak
        </p>
      ) : null}

      <button type="button" onClick={onCreate}>
        Create
      </button>
    </div>
  );
}
