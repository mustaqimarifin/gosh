import { db } from "lib/planetscale";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "server/db/auth";

import Form from "./form";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function GuestbookPage() {
  const session = await auth();
  if (session?.user?.email !== "vmprmyth@gmail.com") {
    redirect("/");
  }

  const entries = await db
    .selectFrom("guestbook")
    .select(["id", "body", "userId", "updatedAt"])
    .orderBy("updatedAt", "desc")
    .limit(500)
    .execute();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">admin</h1>
      <Form entries={entries} />
    </section>
  );
}
