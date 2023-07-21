"use client";

import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { api } from "utils/api";
import { httpBatchLink } from "@trpc/react-query";

import * as dv from "devalue";
import superjson from "superjson";
import { DataTransformer, DataTransformerOptions } from "@trpc/server";

// [...]

/* export const transformer: DataTransformerOptions = {
  input: superjson,
  output: {
    serialize: (object) => dv.uneval(object),
    // This `eval` only ever happens on the **client**
    deserialize: (object) => eval(`(${object})`),
    //deserialize: (object) => new Function(object),
  },
}; */

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
      transformer: superjson,
    }),
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </api.Provider>
  );
};
