"use client"

//import "app/base.css"
import "./Comment.modules.css"

//import Form from "app/hotline/form"
import { usePost } from "hooks/usePost"
import { memo, useState } from "react"
import { api } from "server/trpc/query_client"
import type { Comment } from "types"

import { CommentForm } from "./Form"
import { CommentList } from "./List"
//import { CommentSolo } from "./Single"

const CommentComponent = memo(({ slug }: { slug: string }) => {
  const [error, setError] = useState("")
  //const [comments, setComments] = useState<Comment[]>([])
  //const [activeComment, setActiveComment] = useState(null)
  //const rootComments = comments.filter((comment) => comment.parentId === null)
  /*   const getReplies = (commentId: string) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>ssosdfdfesd   
          new Date(a.createdAt).getTime() -eww Date(b.createdAt).getTime()
      ) */
  const { rootComments } = usePost(slug)

  const utils = api.useContext()
  const ccCount = api.commentCount.useQuery({ slug })
  const createComment = api.addComment.useMutation({
    async onSuccess(input) {
      await utils.getBySlug.invalidate({ slug: input.slug as string })
    },
  })

  const handleCommentCreate = async (text: string) => {
    if (text.trim().length === 0) {
      setError("You need to specify a text!")
      return
    }

    if (text.trim().length < 4) {
      setError("text is too short!")
      return
    }

    return await createComment.mutateAsync({text,slug}).then(() => {
      setError("")
    })
  }

  return (
    <>
      <div className="justify-start text-xs">{ccCount.data}</div>
      <h2 className="p-4 text-center text-xl font-bold text-gray-800">
        Comments
      </h2>
      <CommentForm onSubmit={handleCommentCreate}/>
      {/* <CommentForm onSubmit={handleCommentCreate} /> */}
      {/* <CommentForm onSubmit={handleCommentCreate} error={error} /> */}
      {/*         {rootComments.map((rootComment) => (
          <CommentSolo
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}

          />
        ))}  */}
      <CommentList comments={rootComments} />
    </>
  )
})

export default CommentComponent
