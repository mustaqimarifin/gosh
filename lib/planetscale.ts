import "server-only";

import { type ColumnType, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface GuestbookTable {
  id: Generated<number>;
  email: string;
  body: string;
  created_by: string;
  updated_at?: string;
}

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Account {
  access_token: string | null;
  expires_at: number | null;
  id: Generated<number>;
  id_token: string | null;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: string;
  userId: number;
}

export interface Comment {
  createdAt: Generated<Date>;
  id: Generated<number>;
  parentId: number | null;
  slug: string | null;
  text: string;
  updatedAt: Date | null;
  userId: number | null;
}

export interface Guestbook {
  body: string;
  createdAt: Generated<Date>;
  id: Generated<number>;
  updatedAt: Generated<Date>;
  userId: number | null;
}

export interface Like {
  commentId: number;
  userId: number;
}

export interface Post {
  count: number;
  id: Generated<number>;
  slug: string | null;
}

export interface Session {
  expires: Date;
  id: Generated<number>;
  sessionToken: string;
  userId: number;
}

export interface User {
  email: string | null;
  emailVerified: Date | null;
  id: Generated<number>;
  image: string | null;
  isAdmin: Generated<number>;
  name: string;
  role: Generated<"ADMIN" | "BLOCKED" | "USER">;
}

export interface VerificationToken {
  expires: Date;
  identifier: string;
  token: string;
}

export type DB = {
  account: Account;
  comment: Comment;
  guestbook: Guestbook;
  like: Like;
  post: Post;
  session: Session;
  user: User;
  verificationToken: VerificationToken;
};

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
