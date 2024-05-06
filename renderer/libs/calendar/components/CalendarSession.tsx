import React from 'react';
import cn from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { format, addMinutes } from 'date-fns';
import { Resizable } from 'react-resizable';
import '../../../../node_modules/react-resizable/css/styles.css';
import { Icon, IconButton } from '~core-ui';
import { useTasks } from '~tasks';
import { useSessions, calcTopPosition, HEIGHT_PER_MINUTE, type Session } from '../';

interface CalendarSessionProps {
  session: Session
  i: number
  updateSession: (session: Session) => Promise<void>
  removeSession: () => Promise<void>
}

export const CalendarSession = ({ session, i, updateSession, removeSession }: CalendarSessionProps) => {
  const duration = (session.end.getTime() - session.start.getTime()) / 60000;
  const [height, setHeight] = React.useState(duration * HEIGHT_PER_MINUTE);
  const { setSelectedSession, setUpdateSelectedSession } = useSessions();
  const { setSelectedTask } = useTasks();
  const { color } = session.project;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `session-${i}`,
    data: { session, i, type: 'planning' },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const onResize = async (event, { node, size, handle }) => {
    event.stopPropagation();
    setHeight(size.height as number);
    const _session = {
      ...session,
      end: addMinutes(session.start, Math.round(size.height / HEIGHT_PER_MINUTE)),
    };
    console.log(_session);
    await updateSession(_session);
  };

  const handleOnClick = () => {
    setSelectedSession(session);
    setSelectedTask(session.task);
    setUpdateSelectedSession(() => updateSession);
  };

  return (
    <div
      className="absolute left-1 right-4"
      ref={setNodeRef}
      style={{
        ...style,
        top: calcTopPosition(session.start),
      }}
    >
      <Resizable
        height={height}
        onResize={onResize}
        axis="y"
        draggableOpts={{ grid: [HEIGHT_PER_MINUTE * 5, HEIGHT_PER_MINUTE * 5] }}
      >
        <div
          className={cn(
            'relative group rounded-md text-xs px-1 py-0.5 overflow-hidden',
            `bg-${color}/50 border-${color}/75 hover:bg-${color}/75`
          )}
          style={{ height: height - 2 }}
        >
          <div
            {...listeners}
            {...attributes}
            className="w-full h-full"
            onClick={handleOnClick}
          >
            <div className="flex space-x-2 items-center">
              <Icon name={session.project.icon} size={3} />
              <div>{format(session.start, 'HH:mm')}</div>
              <div>{`${duration}m`}</div>
              <IconButton
                name="remove"
                size={3}
                className="absolute right-1 top-0.5 hidden group-hover:block"
                onClick={removeSession}
              />
            </div>
            <div className="overflow">{session.task?.name}</div>
          </div>
        </div>
      </Resizable>
    </div>
  );
};
