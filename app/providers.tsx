"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  getFetch,
  httpLink,
  loggerLink,
  splitLink,
  unstable_httpBatchStreamLink,
} from "@trpc/react-query"
import { SessionProvider } from "next-auth/react"
import { type ReactNode,useState } from "react"
import { api } from "server/trpc/query_client"
import { getUrl } from "server/trpc/shared"
import SuperJSON from "SuperJSON"

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        splitLink({
          condition(op) {
            // check for context property `skipBatch`
            return op.context.skipBatch === true
          },
          // when condition is true, use normal request
          true: httpLink({
            url: getUrl(),
            fetch: async (input, init?) => {
              const fetch = getFetch()
              return fetch(input, {
                ...init,
                credentials: "include",
              })
            },
          }),
          // when condition is false, use batching
          false: unstable_httpBatchStreamLink({
            url: getUrl(),
            fetch: async (input, init?) => {
              const fetch = getFetch()
              return fetch(input, {
                ...init,
                credentials: "include",
              })
            },
          }),
        }),
      ],
      transformer: SuperJSON,
    })
  )
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </api.Provider>
  )
}
