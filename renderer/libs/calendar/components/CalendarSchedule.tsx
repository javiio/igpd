import React from 'react';
import cn from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { addMinutes } from 'date-fns';
import { Resizable } from 'react-resizable';
import '../../../../node_modules/react-resizable/css/styles.css';
import { calcTopPosition, HEIGHT_PER_MINUTE, type Session } from '../';
import { Icon } from '~core-ui';

interface CalendarScheduleProps {
  session: Session
  i: number
  updateSession: (session: Session) => Promise<void>
}

export const CalendarSchedule = ({ session, i, updateSession }: CalendarScheduleProps) => {
  const duration = (session.end.getTime() - session.start.getTime()) / 60000;
  const [height, setHeight] = React.useState(duration * HEIGHT_PER_MINUTE);
  const { color } = session.project;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `schedule-${i}`,
    data: { session, i, type: 'schedule' },
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
      className="absolute w-[1.35rem]"
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
            'rounded-sm py-0 px-1',
            `bg-${color}/25 border border-${color} hover:bg-${color}/50`
          )}
          style={{ height: height - 2 }}
        >
          <div
            {...listeners}
            {...attributes}
            className="flex space-x-0.5 w-full overflow-hidden"
            style={{ height: height - 16 }}
          >
            <Icon name={session.project.icon} size={3} className="mt-1" />
          </div>
        </div>
      </Resizable>
    </div>
  );
};
