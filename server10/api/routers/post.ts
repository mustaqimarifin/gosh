import { TRPCError } from '@trpc/server';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from 'server10/api/trpc';
import { z } from 'zod';

export const postRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { slug: input.slug },

        select: {
          id: true,
          count: true,
          _count: {
            select: { comments: true },
          },
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              id: true,
              slug: true,
              text: true,
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
        },
      });
      const likes = await ctx.prisma.like.findMany({
        where: {
          userId: ctx.session?.user?.id,
          commentId: {
            in: post?.comments.map((comment: { id: any }) => comment?.id),
          },
        },
      });
      return {
        ...post,
        comments: post?.comments.map(
          (comment_2: { [x: string]: any; id?: any; _count?: any }) => {
            const { _count, ...commentFields } = comment_2;
            return {
              ...commentFields,
              likedByMe: !!likes.find(
                (like: { commentId: any; userId: string }) =>
                  like.commentId === comment_2.id &&
                  like.userId === ctx.session?.user?.id
              ),
              likeCount: _count.likes,
            };
          }
        ),
      };
    }),

  postView: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.post.upsert({
        where: { slug: input.slug },
        create: {
          slug: input.slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  commentCount: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.comment.count({ where: { slug: input.slug } });
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
      return await ctx.prisma.comment
        .create({
          data: {
            slug: input.slug,
            text: input.text,
            parentId: input.parentId,
            userId: ctx.session.user.id!,
          },
        })
        .then((comment) => {
          return {
            ...comment,
            likeCount: 0,
            likedByMe: false,
          };
        });
    }),
  updateComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        text: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      });

      if (res?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to update this comment',
        });
      }

      return await ctx.prisma.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          text: input.text,
        },
      });
    }),
  deleteComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      });
      if (res?.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to delete this comment',
        });
      }

      return await ctx.prisma.comment.delete({
        where: {
          id: input.commentId,
        },
      });
    }),
  toggleLike: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      });
      const like = await ctx.prisma.like.findUnique({
        where: {
          userId_commentId: {
            commentId: input.commentId,
            userId: ctx.session.user.id!,
          },
        },
      });

      if (like === null) {
        return await ctx.prisma.like
          .create({
            data: {
              commentId: input.commentId,
              userId: ctx.session.user.id!,
            },
          })
          .then(() => {
            return { addLike: true };
          });
      } else {
        return await ctx.prisma.like
          .delete({
            where: {
              userId_commentId: {
                commentId: input.commentId,
                userId: ctx.session.user.id!,
              },
            },
          })
          .then(() => {
            return { addLike: false };
          });
      }
    }),
});
