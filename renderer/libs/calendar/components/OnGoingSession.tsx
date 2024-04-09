import React from 'react';
import cn from 'classnames';
import { useToday } from '..';

export const OnGoingSession = () => {
  const { currentSession, formattedTime, isInProgress, toggleInProgress } = useToday();

  return (
    <div>
      <button
        onClick={toggleInProgress}
        className="absolute right-2 top-1 hover:border"
      >
        <div
          className={cn(
            'text-4xl font-[Arial]',
            currentSession && isInProgress ? `text-${currentSession.project.color}` : 'text-gray-400/50'
          )}
        >
          {formattedTime}
        </div>

        <div
          className={cn(
            'w-21 mt-1 mx-0.5 relative flex h-1 rounded-full overflow-hidden',
            'after:rounded-full after:h-full after:w-full after:-translate-x-full',
            currentSession && isInProgress ? `after:bg-${currentSession.project.color} after:animate-[in-progress-wobble_3s_ease-in-out_infinite]` : ''
          )}
        />
      </button>
      { currentSession?.project.name }
    </div>
  );
};
