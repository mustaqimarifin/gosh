"use client"

import {
  experimental_createActionHook as ActionHook,
  experimental_createTRPCNextAppDirClient as ActionClient,
  experimental_serverActionLink as ActionLink,
} from "@trpc/next/app-dir/client"
import { experimental_nextHttpLink as nextLink } from "@trpc/next/app-dir/links/nextHttp"
import { loggerLink } from "@trpc/react-query"
import { type AppRouter } from "server/routers"
import SuperJSON from "SuperJSON"

import { getUrl } from "./shared"

export const api = ActionClient<AppRouter>({
  config() {
    return {
      transformer: SuperJSON,
      // transformer: transformer,
      links: [
        loggerLink({
          enabled: () => true,
        }),
        nextLink({
          batch: true,
          url: getUrl(),
          headers() {
            return {
              "x-trpc-source": "client",
            }
          },
        }),
      ],
    }
  },
})

export const useAction = ActionHook({
  links: [loggerLink(), ActionLink()],
  transformer: SuperJSON,
})
