import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import '../../../../node_modules/react-resizable/css/styles.css';
import { calcTopPosition, HEIGHT_PER_MINUTE, type ActivityLog } from '../';

interface CalendarActivityLogProps {
  activity: ActivityLog
  isInProgress?: boolean
}

export const CalendarActivityLog = ({ activity, isInProgress }: CalendarActivityLogProps) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let _duration = 0;
    if (activity.end) {
      _duration = (activity.end.getTime() - activity.start.getTime()) / 60000;
    } else if (isInProgress) {
      _duration = (new Date().getTime() - activity.start.getTime()) / 60000;
    }
    setDuration(_duration);
  }, [activity, isInProgress]);

  return (
    <div className="mx-3">
      <div
        className={cn('absolute w-3 h-3 rounded-full -m-1.5', `bg-${activity.session.project.color}`)}
        style={{
          top: calcTopPosition(activity.start),
        }}
      />
      <div
        className={cn('absolute w-0.5 -mx-[1px]', `bg-${activity.session.project.color}`)}
        style={{
          top: calcTopPosition(activity.start),
          height: duration * HEIGHT_PER_MINUTE,
        }}
      />
      {activity.end && (
        <div
        className={cn('absolute w-3 h-3 rounded-full -m-1.5', `bg-${activity.session.project.color}`)}
          style={{
            top: calcTopPosition(activity.end),
          }}
        />
      )}
      {isInProgress && (
        <div
          className="absolute flex -m-2"
          style={{
            top: calcTopPosition(new Date()),
          }}
        >
          <div className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${activity.session.project.color}`} />
          <div className={`relative inline-flex rounded-full h-4 w-4 bg-${activity.session.project.color}`} />
        </div>
      )}
    </div>
  );
};
