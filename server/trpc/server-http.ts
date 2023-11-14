"use server";

import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { cookies } from "next/headers";
import superjson from "superjson";
import { getUrl } from "./shared";
import { AppRouter } from "server/routers";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (op) => true,
        }),
        unstable_httpBatchStreamLink({
          //batch: true,
          url: getUrl(),
          headers() {
            return {
              cookie: cookies().toString(),
              "x-trpc-source": "rsc-http",
            };
          },
        }),
      ],
    };
  },
});

// export const createAction =
