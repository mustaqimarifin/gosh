"use server"

import { loggerLink } from "@trpc/client"
import { experimental_nextHttpLink as nextLink } from "@trpc/next/app-dir/links/nextHttp"
import { experimental_createTRPCNextAppDirServer as AppDirServer } from "@trpc/next/app-dir/server"
import { cookies } from "next/headers"
import type { AppRouter } from "server/routers"
import SuperJSON from "SuperJSON"

import { getUrl } from "./shared"

export const api = AppDirServer<AppRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: () => true,
        }),
        nextLink({
          batch: true,
          url: getUrl(),
          headers() {
            return {
              cookie: cookies().toString(),
              "x-trpc-source": "rsc-http",
            }
          },
        }),
      ],
    }
  },
})
