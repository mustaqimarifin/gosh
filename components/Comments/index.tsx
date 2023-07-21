"use client";
import { CommentForm } from "./Form";
import { CommentList } from "./List";
import { usePost } from "hooks/usePost";
import { Suspense, useState } from "react";
import { api } from "utils/api";

const CommentComponent = ({ slug }: { slug: string }) => {
  const [error, setError] = useState("");
  const { rootComments } = usePost(slug);

  const utils = api.useContext();
  const ccCount = api.post.commentCount.useQuery({ slug });
  const createComment = api.post.addComment.useMutation({
    async onSuccess(input) {
      await utils.post.getBySlug.invalidate({ slug: input.slug as string });
    },
  });

  const handleCommentCreate = async (text: string) => {
    if (text.trim().length === 0) {
      setError("You need to specify a text!");
      return;
    }

    if (text.trim().length < 4) {
      setError("text is too short!");
      return;
    }

    return await createComment.mutateAsync({ slug, text }).then(() => {
      setError("");
    });
  };

  return (
    <>
      <div className="text-xs justify-start">{ccCount.data}</div>
      <h2 className="p-4 text-center text-xl font-bold text-gray-800">
        Comments
      </h2>
      <CommentForm onSubmit={handleCommentCreate} error={error} />
      <CommentList comments={rootComments} />
    </>
  );
};

export default CommentComponent;
