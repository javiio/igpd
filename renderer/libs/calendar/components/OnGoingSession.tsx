import React from 'react';
import cn from 'classnames';
import { IconButton } from '~core-ui';
import { InProgressWobble, useToday } from '..';

export const OnGoingSession = () => {
  const { currentSession, currentActionItem, setCurrentActionItem, formattedTime, isInProgress, toggleInProgress } = useToday();

  return (
    <div>
      {currentActionItem && (
        <div className="text-5xl mt-10 flex space-x-2">
          <span>{currentActionItem}</span>
          <IconButton name="x" size={6} onClick={() => setCurrentActionItem(undefined)} className="h-7"/>
        </div>
      )}
      <button
        onClick={toggleInProgress}
        className="absolute right-0 top-0 hover:bg-slate-800/50 rounded-lg pb-1 px-2 transition-colors duration-200 ease-in-out"
      >
        <div
          className={cn(
            'text-4xl font-[Arial] transition-colors duration-200 ease-in-out',
            currentSession && isInProgress ? `text-${currentSession.project.color}` : 'text-gray-400/50'
          )}
        >
          {formattedTime}
        </div>

        <InProgressWobble />
      </button>
    </div>
  );
};
