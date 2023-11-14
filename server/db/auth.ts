import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "process";
import { prisma } from "server/db/prisma";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions = {
  /*   pages: {
    signIn: "/sign-in",
  }, */
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        //session.user.role = user.role; //<-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  //adapter: DAdapter(dbz),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID!,
      clientSecret: env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: env.GITHUB_ID!,
      clientSecret: env.GITHUB_SECRET!,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export function auth() {
  return getServerSession(authOptions);
}
