import React from 'react';
import cn from 'classnames';
import { useToday } from '..';

export const InProgressWobble = () => {
  const { currentSession, isInProgress } = useToday();

  return (
      <div
        className={cn(
          'w-21 mt-1 mx-0.5 relative flex h-1 rounded-full overflow-hidden',
          'after:rounded-full after:h-full after:w-full after:-translate-x-full',
          currentSession && isInProgress ? `after:bg-${currentSession.project.color} after:animate-[in-progress-wobble_3s_ease-in-out_infinite]` : ''
        )}
      />
  );
};
