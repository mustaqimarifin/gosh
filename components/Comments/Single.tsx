import "./Comment.modules.css"

import { Button } from "components/Buttons"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { usePost } from "hooks/usePost"
import { cx } from "lib/utils"
import {
  Heart,
  HeartOff,
  Pencil,
  Reply as ReplyIcon,
  Trash,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { api } from "server/trpc/query_client"
import type { Comment } from "types"

import Avatar from "./Avatar"
import { CommentForm } from "./Form"
import { CommentList } from "./List"

dayjs.extend(relativeTime, {
  rounding: Math.floor,
})
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(dayjs.tz.guess())
const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
})
interface CommentProps {
  comment: Comment
  parentId?: string
  replies?: Comment[]
}

export const CommentSolo = ({ comment }: CommentProps) => {
  const { parentId, id, text, user,updatedAt,createdAt, likeCount, likedByMe, slug } =
    comment
  const replyId = parentId ? parentId : id
  const { data: session } = useSession()
  const { getReplies } = usePost(slug)

  const utils = api.useContext()
  const invalidate = (input: any) => {
    utils.getBySlug.invalidate(input)
  }
  const createComment = api.addComment.useMutation({
    onSuccess(input) {
      invalidate(input)
    },
  })

  const updateComment = api.updateComment.useMutation({
    onSuccess(input) {
      invalidate(input)
    },
  })
  const deleteComment = api.deleteComment.useMutation({
    onSuccess(input) {
      invalidate(input)
    },
  })

  const toggleCommentLike = api.toggleLike.useMutation({
    onSuccess(input) {
      invalidate(input)
    },
  })

  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)

  console.time()
  const replies = getReplies(id)
  console.timeEnd()

  const handleReply = async (text: string) => {
    return await createComment
      .mutateAsync({
        text,
        parentId: replyId,
        slug,
      })
      .then(() => {
        setIsReplying(false)
      })
  }

  const handleCommentEdit = async (text: string) => {
    return await updateComment
      .mutateAsync({
        commentId: id,
        text, updatedAt
        //slug,
      })
      .then(() => {
        setIsEditing(false)
      })
  }

  const handleCommentDelete = async () => {
    return await deleteComment.mutateAsync({
      commentId: id,
      //slug,
    })
  }

  const handleToggleCommentLike = async () => {
    if (!session) return
    return await toggleCommentLike.mutateAsync({
      commentId: id,
      // slug,
    })
  }

  return (
    <div className="border ">
      <div
        key={id}
        className=" tweet flex w-full transform flex-col rounded-lg border border-gray-200 bg-white px-6 text-xs  transition duration-500 ease-in-out dark:border-gray-800 dark:bg-gray-900 "
      >
        <div className="mb-1 flex items-center justify-between px-2 ">
          <div className="mr-3 inline-flex items-center pr-4 text-gray-900 dark:text-white">
            <Avatar src={user?.image} isLoading={false} className="mr-3" />
            <div>{user?.name}</div>
          </div>
          <div className="justify-end">{createdAt.getTime()}</div>
          {user.level !== "NONE" ? (
            <div className="hidden text-xs leading-[18px] sm:inline-flex">
              <span className="color-box-border-info ml-1 rounded-xl border px-[7px] font-medium capitalize">
                {user.level}
              </span>
            </div>
          ) : null}
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            submitLabel="Update"
            initialValue={text}
            onSubmit={handleCommentEdit}
          />
        ) : (
          <div className="text">{text}</div>
        )}
        <div className="mt-2 flex gap-2">
          <Button
            onClick={handleToggleCommentLike}
            Icon={likedByMe ? Heart : HeartOff}
            aria-label={likedByMe ? "Unlike" : "Like"}
            color="text-purple-700"
          >
            {likeCount}
          </Button>
          {session && (
            <Button
              onClick={() => setIsReplying((prev) => !prev)}
              Icon={ReplyIcon}
              aria-label="Reply"
              isActive={isReplying}
              color="text-purple-700"
            />
          )}
          {user?.id === session?.user?.id && (
            <>
              <Button
                onClick={() => setIsEditing((prev) => !prev)}
                Icon={Pencil}
                aria-label="Edit"
                isActive={isEditing}
                color="text-purple-700"
              />
              <Button
                onClick={handleCommentDelete}
                Icon={Trash}
                aria-label="Delete"
                color="text-red-700"
                hoverbg="hover:bg-red-50"
              />
            </>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="ml-3 mt-1">
          <CommentForm autoFocus submitLabel="Reply" onSubmit={handleReply} />
        </div>
      )}
      {/*  {replies?.length > 0 && (
        <>
          <div className={cx("flex", areChildrenHidden && "hidden")}>
            <button
              className="relative mt-2 w-[15px] -translate-x-1/2 cursor-pointer border-none bg-none p-0 outline-none before:absolute before:bottom-0 before:left-1/2 before:top-0 before:w-px before:bg-purple-200 before:transition-all before:duration-200 before:ease-in-out before:content-[''] hover:before:bg-purple-400 focus-visible:before:bg-purple-400"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            /> 
                       <div className="grow">
              <div className="grow">     <CommentList comments={replies} /></div>
            </div> 
       
          </div>           <button
            className={cx(
              "relative mt-2 rounded bg-purple-600 px-4 py-2 text-sm text-white ease-in-out hover:bg-purple-400 hover:transition-colors hover:duration-100",
              !areChildrenHidden && "hidden"
            )}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button> 
        </>
      )} */}
      {replies &&
        replies.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ) &&
        replies?.length > 0 && (
          <div className="pl-4">
            <CommentList comments={replies} />

            {/*  {replies && replies?.length > 0 && (
                <>
            {replies.map((reply) => (
                        <div className="pl-4">

              <CommentSolo
                comment={reply}
                parentId={comment.id}
                //replies={getReplies(comment.id)}
                replies={[]}
                key={reply.id}
              />
                </div>
            ))}
        </>
        )}  */}
          </div>
        )}
    </div>
  )
}
