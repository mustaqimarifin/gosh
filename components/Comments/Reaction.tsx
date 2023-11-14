import { cx } from 'lib/utils'
import React, { FC } from 'react';
import Image from 'next/image'

export interface ReactionProps {
  type: string;
}

const Reaction: FC<ReactionProps> = ({ type }) => {
  const query = useReaction({ type });

  return (
    <div
      className={cx(
        'h-4 w-4 rounded-full grid place-items-center text-alpha-50'
      )}
    >
      <Image
        className={'h-4 w-4'}
        src={query.data?.url}
        alt={query.data?.label}
      />
    </div>
  );
};

export default Reaction;
