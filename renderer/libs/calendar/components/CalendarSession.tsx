import React from 'react';
import cn from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { format, addMinutes } from 'date-fns';
import { Resizable } from 'react-resizable';
import '../../../../node_modules/react-resizable/css/styles.css';
import { START_TIME, HEIGHT_PER_MINUTE, type Session } from '../';
import { Icon } from '~core-ui';

interface CalendarSessionProps {
  session: Session
  i: number
  updateSession: (session: Session) => Promise<void>
}

export const CalendarSession = ({ session, i, updateSession }: CalendarSessionProps) => {
  const duration = (session.end.getTime() - session.start.getTime()) / 60000;
  const [height, setHeight] = React.useState(duration * HEIGHT_PER_MINUTE);
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
    await updateSession(_session);
  };

  return (
    <div
      className="absolute left-1 right-4"
      ref={setNodeRef}
      style={{
        ...style,
        top: ((session.start.getHours() - START_TIME) * 60 + session.start.getMinutes()) * HEIGHT_PER_MINUTE,
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
            'rounded-md text-xs px-0.5 py-[1px]',
            `bg-${color}/50 border-${color}/75 hover:bg-${color}/75`
          )}
          style={{ height: height - 2 }}
        >
          <div
            {...listeners}
            {...attributes}
            className="flex space-x-0.5 w-full overflow-hidden"
            style={{ height: height - 16 }}
          >
            <Icon name={session.project.icon} size={3.5} className="mt-0.5" />
            <div className="flex-1">{session.task?.name}</div>
          </div>

          <div className="absolute bottom-[1px] left-1 h-4 text-slate-300 flex space-x-2">
            <div>
              {format(session.start, 'HH:mm')}
            </div>
            <div>
              {`${duration}m`}
            </div>
          </div>
        </div>
      </Resizable>
    </div>
  );
};
