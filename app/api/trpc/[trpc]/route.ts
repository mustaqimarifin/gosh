import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "server10/api/root";
import { createContext, createTRPCContext } from "server10/api/trpc";

// this is the server RPC API handler

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createContext,
  });
};
export const GET = handler;
export const POST = handler;
