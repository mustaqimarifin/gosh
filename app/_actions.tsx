"use server"

import { revalidatePath } from "next/cache"
import {
  createAction,
  protectedProcedure,
  publicProcedure,
} from "server/context"
import { auth } from "server/db/auth"
import { z } from "zod"

const rhfActionSchema = z.object({
  text: z.string().min(1),
})
export const hotAction = createAction(
  publicProcedure
    .input(
      z.object({
        text: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const entry = await opts.ctx.prisma.hotline.create({
        data: {
          text: opts.input.text,
          userId: opts.ctx.session!.user.id,
          createdAt: new Date()
        },
      })
      revalidatePath("/hotline")

      return {
        entry,
      }
    })
)
export const addComment = createAction(
  protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        parentId: z.string().optional(),
        text: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.post.findUnique({
        where: { slug: input.slug },
      })
      return await ctx.prisma.comment
        .create({
          data: {
            slug: input.slug,
            text: input.text,
            parentId: input.parentId,
            userId: ctx.session!.user.id,
            createdAt: new Date()

          }
        })
        .then((comment) => {
          revalidatePath("/post/[slug]")

          return comment
        })
    })
)
export const pageCount = createAction(
  publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async (opts) => {
      const total = await opts.ctx.prisma.post.upsert({
        where: opts.input,
        create: opts.input,
        update: {
          count: {
            increment: 1,
          },
        },
      })
      revalidatePath("/post/[slug]")

      return { total }
    })
)

/* export const saveGuestbookEntry= async(formData: FormData) => {
  const session = await auth()
  const userId = session.user.id 
  const slug = formData.get("slug")?.toString() || ""
  const entry = formData.get("entry")?.toString() || ""
  const body = entry.slice(0, 500)

  await supabase
    .from("hotline")
    .insert({ body, slug, author_id: userId })
    .select()

  revalidatePath("/hotline")

  
} */
