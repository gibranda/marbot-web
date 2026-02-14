import { defaultShouldDehydrateQuery, isServer, QueryClient } from "@tanstack/react-query";

import type { QueryClientConfig } from "@tanstack/react-query";

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error: Error & { isToaster?: boolean }) => {
        if (error.isToaster) {
          const isMessage = "message" in error || "description" in error;
          console.error(isMessage ? error.message : "Error");
        }
      },
    },
    dehydrate: {
      // include pending queries in dehydration
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
  },
};

export const queryClient = new QueryClient(queryClientOptions);

function makeQueryClient() {
  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
