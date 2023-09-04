import { HotBox } from "components/Hotline/Box"
import type { Metadata } from "next"
import { type CompleteHotline } from "prisma/ZOD"
import { cache } from "react"
import { Balancer } from "react-wrap-balancer"
import { auth } from "server/db/auth"
import { api } from "server/trpc/rpc_client"

import LoginForm from "./login-form"

const getHotline = cache(async () => {
  const entries = await api.getHot.query()
  return entries as unknown as CompleteHotline[]
})

async function HotlineForm() {
  const session = await auth()

  return <LoginForm session={session} />
}

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message!.",
}

export default async function HotlinePage() {
  const entries = await getHotline()
  //const user = await getUser()
  return (
    <>
      <section>
        <h1 className="mb-5 font-serif text-3xl font-bold">
          <Balancer>Guestbook</Balancer>
        </h1>
        <HotlineForm />
        <>
          {entries &&
            entries.map((post) => (
              <HotBox
                key={post.id}
                text={post.text}
                user={post.user}
                createdAt={post.createdAt}
              />
            ))}
        </>
      </section>
    </>
  )
}

/* //^PRISMA 

const getHotline = cache(async () => {
  return await prisma.guestbook.findMany({
    include: {
      user: true
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
})

*/

/* //^KYSELY
db
    .selectFrom("Guestbook")
    .innerJoin("User", "User.id", "Guestbook.userId")
    .select([
      "Guestbook.id",
      "body",
      "User.name as username",
      "User.image as avatar",
      "updatedAt",
    ])
    .orderBy("updatedAt", "desc")
    .limit(100)
    .execute()
    
 */
