import { CommentReactionMetadata } from 'types'
import CommentReaction from './CommentReaction';
import ReactionSelector from './ReactionSelector';

export interface CommentReactionsProps {
  activeReactions: Set<string>;
  reactionsMetadata: CommentReactionMetadata[];
  toggleReaction: (reactionType: string) => void;
}

export const CommentReactions = ({
  activeReactions,
  reactionsMetadata,
  toggleReaction,
}: CommentReactionsProps) => {
  return (
    <div className="flex h-6 space-x-2">
      <ReactionSelector
        activeReactions={activeReactions}
        toggleReaction={toggleReaction}
      />
      {reactionsMetadata.map((reactionMetadata) => (
        <CommentReaction
          key={reactionMetadata.reactionType}
          metadata={reactionMetadata}
          toggleReaction={toggleReaction}
        />
      ))}
    </div>
  );
};

