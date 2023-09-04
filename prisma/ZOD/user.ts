import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteComment, relatedCommentSchema, CompleteLike, relatedLikeSchema, CompleteSession, relatedSessionSchema, CompleteHotline, relatedHotlineSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  comments: CompleteComment[]
  likes: CompleteLike[]
  sessions: CompleteSession[]
  hotlines: CompleteHotline[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  comments: relatedCommentSchema.array(),
  likes: relatedLikeSchema.array(),
  sessions: relatedSessionSchema.array(),
  hotlines: relatedHotlineSchema.array(),
}))
