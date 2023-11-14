import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'server/trpc/query-client'
import type { Comment } from 'types';

interface UseAddReactionPayload {
  payload:{
    reactionType: string;
    commentId: number;
  }

}

// Do a little surgery on the comment and manually increment the reaction count
// or add a new item to the array if the reaction was not previously in the
// reactions array.
const addOrIncrement = (reactionType: string, comment: Comment): Comment => {
  const isInArray = !!comment.reactionMetadata.find(
    (val) => val.reactionType === reactionType
  );
  let newArray = [...comment.reactionMetadata];
  if (!isInArray) {
    newArray.push({
      commentId: comment.id,
      reactionType: reactionType,
      reactionCount: 1,
      active_for_user: true,
    });
  } else {
    newArray = newArray.map((item) => {
      if (item. reactionType === reactionType) {
        return {
          ...item,
          reactionCount: item.reactionCount + 1,
          active_for_user: true,
        };
      } else {
        return item;
      }
    });
  }
  newArray.sort((a, b) => a. reactionType.localeCompare(b. reactionType));
  return {
    ...comment,
    reactionMetadata: newArray,
  };
};

const { data: post } = api.addCommentReaction.useMutation( {payload}: UseAddReactionPayload );

const useAddReaction = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    (payload: UseAddReactionPayload) => {
      return api.addCommentReaction({
        reaction_type: payload.reactionType,
        comment_id: payload.commentId,
      });
    },
    {
      onSuccess: (data, params) => {
        // Manually patch the comment while it refetches
        queryClient.setQueryData(
          ['comments', params.commentId],
          (prev: Comment) => addOrIncrement(params.reactionType, prev)
        );
        queryClient.invalidateQueries(['comments', params.commentId]);
        queryClient.invalidateQueries([
          'comment-reactions',
          { commentId: params.commentId, reactionType: params.reactionType },
        ]);
      },
    }
  );
};

export default useAddReaction;
