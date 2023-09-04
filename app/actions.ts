"use server"

import { actionClient } from "lib/supabase/server"
import { revalidatePath } from "next/cache"
import { type Session } from "next-auth"
import { createAction, publicProcedure } from "server/context"
import { auth } from "server/db/auth"
import { z } from "zod"

/**
 * Either inline procedures using trpc's flexible
 * builder api, with input parsers and middleware
 * Wrap the procedure in a `createAction` call to
 * make it server-action friendly
 */

//export const viewCount = (slug) => apiAC.godpost.upsertOnePost.mutate(slug)
/* export const inc = ({slug}:{slug:string}) => {
  try {
    const views = apiAC.godpost.upsertOnePost.mutate({slug})

    return views
  } catch (err) {
    console.log(err)
  }
} */
/* export async function increment(slug: string) {
  const data = await queryBuilder
    .selectFrom('views')
    .where('slug', '=', slug)
    .select(['count'])
    .execute()

  const views = !data.length ? 0 : Number(data[0].count)

  return queryBuilder
    .insertInto('views')
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute()
} */

async function getSession(): Promise<Session> {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  return session
}

/*  export async function saveGuestbookEntry(formData: FormData) {
  const supabase = actionClient()
  const {data: {session}} = await supabase.auth.getSession()
  const userId = session.user.id 
  const slug = formData.get("slug")?.toString() || ""
  const entry = formData.get("entry")?.toString() || ""
  const body = entry.slice(0, 500)

  await supabase
    .from("hotline")
    .insert({ body, slug, author_id: userId })
    .select()

  revalidatePath("/hotline")

  
}
  */
