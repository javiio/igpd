import React from 'react';
import { setHours, setMinutes, addMinutes, isToday } from 'date-fns';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, createSnapModifier } from '@dnd-kit/modifiers';
import { uid } from '~platform';
import { useProjects } from '~projects';
import { useTasks } from '~tasks';
import { useDaily, CalendarSession, CalendarSchedule, CalendarActivityLog, useToday, TIMES, HEIGHT_PER_MINUTE, type Session } from '../';
interface DailyCalendarProps {
  date: Date
};

const CalendarLines = ({ date, onClick }: { date: Date, onClick: (start: Date, end: Date) => Promise<void> }) => {
  const handleClick = async (timeString: string) => {
    const hours = parseInt(timeString.split(':')[0], 10);
    const minutes = parseInt(timeString.split(':')[1], 10);
    const start = setHours(setMinutes(date, minutes), hours);
    const end = addMinutes(start, 30);
    await onClick(start, end);
  };

  return (
    <>
      {TIMES.map((time) => (
        <div key={time} className="relative">
          <div
            className="border-b border-b-white/10 w-full hover:bg-gray-100/10 cursor-pointer"
            style={{ height: 30 * HEIGHT_PER_MINUTE }}
            onClick={async () => await handleClick(time)}
          />
          <div
            className="border-b border-b-white/30 w-full hover:bg-gray-100/10 cursor-pointer"
            style={{ height: 30 * HEIGHT_PER_MINUTE }}
            onClick={async () => await handleClick(`${time.split(':')[0]}:30`)}
          />
        </div>
      ))}
    </>
  );
};

export const DailyCalendar = ({ date }: DailyCalendarProps) => {
  const { selectedProject, defaultProject } = useProjects();
  const { selectedTask } = useTasks();
  const { schedule, sessions, activityLogs, addSchedule, addSession, updateSchedule, updateSession, removeSession } = useDaily(date);
  const { currentTimePosition, isInProgress } = useToday();

  const { setNodeRef } = useDroppable({
    id: 'calendar-droppable',
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  const snapToGrid = createSnapModifier(HEIGHT_PER_MINUTE * 5);
  const modifiers = [restrictToVerticalAxis, snapToGrid];

  const handleAddSchedule = async (start: Date, end: Date) => {
    await addSchedule({
      id: uid(),
      start,
      end,
      project: selectedProject ?? defaultProject,
    });
  };

  const handleAddSession = async (start: Date, end: Date) => {
    await addSession({
      id: uid(),
      start,
      end,
      project: selectedProject ?? defaultProject,
      task: selectedTask,
    });
  };

  const handleOnDragEnd = async (event) => {
    const { y } = event.delta;
    const mins = Math.round(y / HEIGHT_PER_MINUTE);
    const session = event.active.data.current.session as Session;
    const i = event.active.data.current.i as number;
    const type = event.active.data.current.type as string;
    session.start = addMinutes(session.start, mins);
    session.end = addMinutes(session.end, mins);
    if (type === 'schedule') {
      await updateSchedule(session, i);
    } else if (type === 'planning') {
      await updateSession(session, i);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={modifiers}
      onDragEnd={handleOnDragEnd}
    >
      <div ref={setNodeRef} className="relative">
        <div className="flex">
          <div className="w-10">
            {TIMES.map((time) => (
              <div
                key={time}
                className="text-xs pr-1 pt-1 text-white/75 text-right"
                style={{ height: 60 * HEIGHT_PER_MINUTE }}
              >
                {time}
              </div>
            ))}
          </div>

          <div className="w-6 border-x border-slate-700">
            <CalendarLines date={date} onClick={handleAddSchedule} />
            {schedule.map((session, i) => (
              <CalendarSchedule
                key={i}
                i={i}
                session={session}
                updateSession={async (s: Session) => await updateSchedule(s, i)}
              />
            ))}
          </div>

          <div className="flex-1 relative">
            <CalendarLines date={date} onClick={handleAddSession} />
            {sessions.map((session, i) => (
              <CalendarSession
                key={session.id}
                i={i}
                session={session}
                updateSession={async (s: Session) => await updateSession(s, i)}
                removeSession={async () => await removeSession(i)}
              />
            ))}
          </div>

          <div className="z-10 border-l border-l-white/10">
            <CalendarLines date={date} onClick={handleAddSchedule} />
            {activityLogs.map((activity, i) => (
              <CalendarActivityLog
                key={i}
                activity={activity}
                isInProgress={
                  isInProgress &&
                  isToday(date) &&
                  i === activityLogs.length - 1 &&
                  !activity.end
                }
              />
            ))}
          </div>
        </div>

        {isToday(date) && (
          <div
            className="absolute left-10 right-0 h-0.5 bg-red-500/70"
            style={{ top: currentTimePosition }}
          >
            <div className="absolute -top-1 left-5 w-2.5 h-2.5 bg-red-500/90 rounded-full" />
          </div>
        )}
      </div>
    </DndContext>
  );
};
