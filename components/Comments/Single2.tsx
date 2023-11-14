'use client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(relativeTime, {
  rounding: Math.floor,
})
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(dayjs.tz.guess())
import { MarkdownRenderer } from 'components/renderer'
import { usePost } from 'hooks/usePost'
import { cx } from 'lib/utils'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { api } from 'server/trpc/query-client'

import Avatar from './Avatar'
import { CommentForm } from './Form'
import { CommentList } from './List'
import { type CommentProps } from './Single'
import { Tag } from 'components/Tag'
const MAX_LINES = 10
const LINE_HEIGHT = 24 // in px
const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT

export const CommentSolo2 = ({ comment }: CommentProps) => {
  const {
    parentId,
    id,
    text,
    user,
    highlight,
    isDeleted,
    updatedAt,
    createdAt,
    likeCount,
    likedByMe,
    reactionMetadata,
    slug,
  } = comment
  const { data: session } = useSession()
  const authorId = comment.user.id
  const canDelete = authorId === session?.user.id //&& replies.length === 0
  const [hidden, setHidden] = useState(false)
  const [isOverflowExpanded, setIsOverflowExpanded] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const textRef = useRef(null)

  const replyId = parentId ? parentId : id
  const { getReplies } = usePost(slug)

  const utils = api.useUtils()
  const invalidate = (input) => {
    utils.getBySlug.invalidate(input)
  }
  const createComment = api.addComment.useMutation({
    async onSuccess(input) {
      invalidate(input)
    },
  })

  const addReaction = api.addCommentReaction.useMutation({
    async onSuccess(input) {
      invalidate(input)
    },
  })

  const updateComment = api.updateComment.useMutation({
    async onSuccess(input) {
      invalidate(input)
    },
  })
  const deleteComment = api.deleteComment.useMutation({
    async onSuccess(input) {
      invalidate(input)
    },
  })

  const toggleCommentLike = api.toggleLike.useMutation({
    async onSuccess(input) {
      invalidate(input)
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  console.time()
  const replies = getReplies(id)
  console.timeEnd()

  const handleEdit = async (text: string) => {
    return await updateComment
      .mutateAsync({
        commentId: id,
        text,
        updatedAt,
        //slug,
      })
      .then(() => {
        setIsEditing(false)
      })
  }

  const handleDelete = async () => {
    return await deleteComment.mutateAsync({
      commentId: id,
      //slug,
    })
  }

  const handleLike = async () => {
    if (!session) return
    return await toggleCommentLike.mutateAsync({
      commentId: id,
      // slug,
    })
  }

  const handleReaction = async () => {
    if (!session) return
    return await addReaction.mutateAsync({
      commentId: id,
      reactionType: reactionMetadata,
      // slug,
    })
  }

  const handleReply = async (text: string) => {
    return await createComment
      .mutateAsync({
        text,
        parentId: replyId,
        slug,
      })
      .then(() => {
        setShowReplyForm(false)
      })
  }

  useEffect(() => {
    if (textRef && textRef.current) {
      const el = textRef.current
      //@ts-ignore
      if (el.scrollHeight > MAX_HEIGHT) {
        setIsOverflow(true)
      }
    }
  }, [])

  /*   const deleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to remove comment?')) {
      try {
        await supabase.from('comments').delete().eq('id', comment.id);
        setComments(comments.filter((x) => x.id != comment.id));
      } catch (error) {
        console.log('error', error);
      }
      return {};
    }
  }; */

  /*   async function handleApprove() {
    const { data } = await supabase
      .from('comments')
      .update({
        isApproved: true
      })
      .eq('id', comment.id);
    // mutateComments(comment.mutateKey);
  }
  async function handleDeny() {
    const { data } = await supabase
      .from('comments')
      .update({
        isPublished: false,
        isApproved: false
      })
      .eq('id', comment.id);
  } */

  async function handlePin() {
    return
  }
  return (
    <div key={id} className="flex flex-col">
      {/*       <div className=" tweet rounded-lg border border-gray-200 dark:border-gray-800 px-6 py-4 my-4 w-full bg-white dark:bg-gray-900 flex flex-col transition duration-500 ease-in-out transform ">
       */}{' '}
      {/*         {!hidden && parent && (
          <div className="grid gap-x-2 comment-grid">
            <div className="w-6 relative">
              <div className="col-start-1 border-pink-700 border-t-2 border-l-2 rounded-tl box-border absolute -right-1 bottom-0 w-2/3 h-1/2" />
            </div>
            <div className="col-start-2 flex items-center leading-none mb-1 transform translate-y-1">
              <button
                className="text-xs text-gray-500 hover:underline focus-ring active:underline cursor-pointer focus:outline-none"
                aria-label={`View comment by ${parent.name}`}
              >
                @{parent.name}:
              </button>
              <div className="text-xs text-gray-800 ml-1 hover:text-gray-400 focus-ring active:text-gray-400 cursor-pointer focus:outline-none line-clamp-1">
                {parent.text}
              </div>
            </div>
          </div>
        )} */}
      <div
        className={cx('grid gap-x-3 comment-grid', {
          'gap-y-1': !hidden,
        })}>
        {highlight && (
          <>
            <div className="row-start-1 col-start-1 row-end-3 col-end-3 -m-1 opacity-5 bg-indigo-700 dark:bg-indigo-50 dark:border-gray-100 rounded pointer-events-none" />
          </>
        )}
        {!hidden ? (
          <>
            <div className="grid row-start-1 col-start-1 place-items-center overflow-hidden">
              <Avatar src={user?.image} isLoading={false} className="mr-3" />
            </div>
            <div className="row-start-2 row-end-5 col-start-1 col-end-2 row-span-auto flex justify-center my-1 px-1">
              <button
                className={cx(
                  'flex-grow flex justify-center border-none group focus-ring mb-1',
                  hidden
                )}
                onClick={() => setHidden(true)}
                aria-label={`Collapse comment by ${comment.user}`}>
                <div
                  className={cx('w-0 h-full', {
                    'bg-gray-200 group-hover:bg-gray-500 group-active:bg-gray-500 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400':
                      !highlight,
                    'bg-gray-300 group-hover:bg-gray-600 group-active:bg-gray-600 dark:bg-gray-600 dark:group-hover:bg-gray-400 dark:group-active:bg-gray-400':
                      highlight,
                  })}
                />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setHidden(false)}
            className={
              'row-start-1 col-start-1 grid place-items-center focus-ring w-7 h-7'
            }
            aria-label={`Expand comment by ${comment.user}`}>
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        )}
        <div className="row-start-1 col-start-2 self-center">
          <div className="flex flex-grow items-end">
            <span
              className={cx('text-gray-700 dark:text-gray-100 ', {
                'text-sm font-medium': !hidden,
                'text-sm': hidden,
              })}>
              {!comment.isDeleted ? comment.user.name : <>[Deleted]</>}{' '}
            </span>
            <span className="text-gray-300 dark:text-gray-500 font-semibold text-sm mx-1 select-none">
              ·
            </span>
            <span
              className="text-gray-400 text-sm font-light  justify-self-auto"
              suppressHydrationWarning>
              {dayjs().diff(comment.createdAt, 'seconds', true) < 30
                ? 'just now'
                : dayjs(comment.createdAt).fromNow()}
            </span>
            {comment.user.level !== null ? (
              <div className="hidden sm:inline-flex">
                <span className=" mx-2 ">
                  <Tag name={comment.user.level} />
                </span>
              </div>
            ) : null}
            {session?.isAdmin && (
              <button
                className="text-xs flex flex-row items-center text-gray-600 dark:text-gray-400 focus-ring border-none ml-5 leading-none"
                onClick={handlePin}
                aria-label={`Pin comment by ${comment.user.name}`}>
                Pin comment
              </button>
            )}
          </div>
        </div>

        <div className={cx('row-start-2 col-start-2', { hidden })}>
          <section
            className={cx(
              'text-gray-700 dark:text-gray-50 leading-6 text-sm font-light pb-2',
              {
                'line-clamp-10': !isOverflowExpanded,
                hidden,
              }
            )}
            ref={textRef}>
            <div className="prose-xs text-zinc-800  dark:text-gray-100 ">
              <MarkdownRenderer children={text} variant="comment" />
            </div>
          </section>

          {isOverflow && (
            <button
              className="text-sm text-indigo-700 dark:text-indigo-400 hover:underline focus:underline focus-ring border border-transparent leading-none"
              onClick={() => setIsOverflowExpanded(!isOverflowExpanded)}
              aria-label={`Pin comment by ${comment.user.name}`}>
              {isOverflowExpanded ? (
                <span>Show less</span>
              ) : (
                <span>Read more</span>
              )}
            </button>
          )}

          {session && (
            <div className="grid grid-flow-col justify-start auto-cols-min gap-x-3 transform">
              <span
                className="text-xs flex items-center text-gray-600 dark:text-gray-100 border-none"
                onClick={() => setShowReplyForm(!showReplyForm)}
                aria-label={
                  showReplyForm
                    ? `Hide reply form`
                    : `Reply to comment by ${comment.user}`
                }>
                {showReplyForm ? (
                  <button className="text-gray-500 dark:text-gray-200 hover:text-red-300">
                    Cancel&nbsp;&nbsp;
                  </button>
                ) : (
                  <button className="text-gray-500 dark:text-gray-200 hover:text-indigo-300">
                    Reply&nbsp;&nbsp;
                  </button>
                )}

                {canDelete && (
                  <button
                    className="text-xs flex flex-row items-center text-gray-500 dark:text-gray-200 hover:text-yellow-300 border-none"
                    onClick={handleDelete}
                    aria-label={`Delete comment by ${comment.user.name}`}>
                    &nbsp;Delete
                  </button>
                )}
              </span>
            </div>
          )}
        </div>

        <div
          className={cx(
            'row-start-4 row-span-2 rounded-md transform -translate-x-2 -mr-2',
            {
              hidden,
            }
          )}>
          {showReplyForm && (
            <div className="divide-pink-200 ">
              <CommentForm
                autoFocus
                submitLabel="Reply"
                onSubmit={handleReply}
                handleResetCallback={() => setShowReplyForm(false)}
              />
            </div>
          )}
          {replies &&
            replies.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            ) &&
            replies?.length > 0 && (
              <div className={cx('pt-2 space-y-5')}>
                <CommentList comments={replies} />
              </div>
            )}
        </div>
        {comment.continueThread && replies?.length === 0 && (
          <div className="flex items-center">
            <button
              className={cx(
                'mt-5 text-xs inline-flex items-center text-gray-600 focus-ring border border-transparent',
                { hidden }
              )}
              aria-label={`Continue thread`}>
              <div className="h-px w-8 bg-gray-400 dark:bg-gray-600 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">
                {`View ${likeCount === 1 ? 'reply' : 'replies'} (${likeCount})`}
              </span>
            </button>
          </div>
        )}
      </div>
      {/*  </div> */}
    </div>
  )
}
