"use server"

import { loggerLink } from "@trpc/client"
import { experimental_nextCacheLink as CacheLink } from "@trpc/next/app-dir/links/nextCache"
import { experimental_createTRPCNextAppDirServer as RPCServer } from "@trpc/next/app-dir/server"
import { cookies } from "next/headers"
import { auth } from "server/db/auth"
import { prisma } from "server/db/prisma"
import { type AppRouter,appRouter } from "server/routers"
import SuperJSON from "SuperJSON"

/**
 * This client invokes prsocedures directly on the server without fetching over HTTP.
 */
export const api = RPCServer<AppRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: () => true,
        }),
        CacheLink({
          // requests are cached for 5 seconds
          revalidate: 5,
          router: appRouter,
          createContext: async () => {
            return {
              session: await auth(),
              prisma,
              headers: {
                cookie: cookies().toString(),
                "x-trpc-source": "rsc-invoke",
              },
            }
          },
        }),
      ],
    }
  },
})
