import { experimental_nextHttpLink as httpBatchLink } from "@trpc/next/app-dir/links/nextHttp";
import { experimental_createTRPCNextAppDirServer as createTRPCNext } from "@trpc/next/app-dir/server";
import { loggerLink } from "@trpc/client";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "server10/api/root";
import superjson from "superjson";
import { createTRPCReact } from "@trpc/react-query";

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCReact<AppRouter>();
