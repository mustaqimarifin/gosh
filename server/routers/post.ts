import { Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { protectedProcedure, publicProcedure, router } from "server/context"
import { z } from "zod"

export const scrape = Prisma.validator<Prisma.PostSelect>()({
  slug: true,
  //count: true,
  _count: {
    select: { comments: true },
  },
  comments: {
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      text: true,
      //replies:true,
      parentId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: { select: { likes: true } },
    },
  },
})

export const postRouter = router({
  getCommentByID: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const comment = await ctx.prisma.comment.findUnique({
        where: input,
      })
      return comment?.id
    }),
  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: input,
        select: scrape,
      })
      const likes = await ctx.prisma.like.findMany({
        where: {
          userId: ctx.session?.user?.id,
          commentId: {
            in: post?.comments.map((comment) => comment?.id),
          },
        },
      })
      return {
        ...post,
        comments: post?.comments.map((comment) => {
          const { _count, ...commentFields } = comment
          return {
            ...commentFields,
            likedByMe: !!likes.find(
              (like) =>
                like.commentId === comment.id &&
                like.userId === ctx.session?.user?.id
            ),
            likeCount: _count.likes,
          }
        }),
      }
    }),
  viewsBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const views = await ctx.prisma.post.findMany({
        where: input,
        select: {
          //slug: true,
          count: true,
        },
      })
      //console.log(views)
      //const x = views[0].count //views[0].count /*  views?.forEach((x) => {
      //if (x.count === null) return null
      //if (x.count > 1) return x.count

      return views[0].count
    }),
  totalViews: publicProcedure.query(async ({ ctx }) => {
    const total = await ctx.prisma.post.aggregate({
      _sum: {
        count: true,
      },
    })
    return total._sum.count
  }),
  addViewCount: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const total = await ctx.prisma.post.upsert({
        where: input,
        create: input,
        update: {
          count: {
            increment: 1,
          },
        },
      })

      /*       if (total?.count < 1) return null
      total = await ctx.prisma.post.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          count: true,
        },
      }) */
      return { total }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany()
  }),
  commentCount: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.comment.count({ where: { slug: input.slug } })
    }),
  addComment: protectedProcedure
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
          },
          select: {
            slug: true,
          },
        })
        .then((comment) => {
          return {
            ...comment,
            likeCount: 0,
            likedByMe: false,
          }
        })
    }),

  updateComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        text: z.string(),
        updatedAt: z.date()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      })

      if (res?.userId !== ctx.session!.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to update this comment",
        })
      }

      return await ctx.prisma.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          text: input.text,
          updatedAt:new Date()

        }
      })
    }),
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      })
      if (res?.userId !== ctx.session?.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to delete this comment",
        })
      }

      return await ctx.prisma.comment.delete({
        where: {
          id: input.commentId,
        },
      })
    }),
  toggleLike: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      })
      const like = await ctx.prisma.like.findUnique({
        where: {
          userId_commentId: {
            commentId: input.commentId,
            userId: ctx.session!.user.id,
          },
        },
      })

      if (like === null) {
        return await ctx.prisma.like
          .create({
            data: {
              commentId: input.commentId,
              userId: ctx.session!.user.id,
            },
          })
          .then(() => {
            return { addLike: true }
          })
      } else {
        return await ctx.prisma.like
          .delete({
            where: {
              userId_commentId: {
                commentId: input.commentId,
                userId: ctx.session!.user.id,
              },
            },
          })
          .then(() => {
            return { addLike: false }
          })
      }
    }),
})
