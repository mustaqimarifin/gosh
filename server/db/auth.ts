import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { env } from "process"
import { prisma } from "server/db/prisma"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

//type UserRole = 'USER' | 'ADMIN' | 'BLOCKED'
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      //role: Role;
    } & DefaultSession["user"]
  }

  /* interface User extends DefaultUser {
    role: Role;
  } */
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        //session.user.role = user.role; //<-- put other properties on the session here
      }
      return session
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
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export function auth() {
  return getServerSession(authOptions)
}
