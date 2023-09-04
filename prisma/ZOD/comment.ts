import * as z from "zod"
import { CompletePost, relatedPostSchema, CompleteUser, relatedUserSchema, CompleteLike, relatedLikeSchema } from "./index"

export const commentSchema = z.object({
  id: z.string(),
  text: z.string().max(10000),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  userId: z.string().nullish(),
  parentId: z.string().nullish(),
  slug: z.string().nullish(),
})

export interface CompleteComment extends z.infer<typeof commentSchema> {
  parent?: CompleteComment | null
  replies: CompleteComment[]
  post?: CompletePost | null
  user?: CompleteUser | null
  likes: CompleteLike[]
}

/**
 * relatedCommentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCommentSchema: z.ZodSchema<CompleteComment> = z.lazy(() => commentSchema.extend({
  parent: relatedCommentSchema.nullish(),
  replies: relatedCommentSchema.array(),
  post: relatedPostSchema.nullish(),
  user: relatedUserSchema.nullish(),
  likes: relatedLikeSchema.array(),
}))
