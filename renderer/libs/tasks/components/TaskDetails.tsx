import React, { useState } from 'react';
import { TimeInterval } from '~core-ui';
import { NoteEditor } from '~notes';
import { useSessions } from '~calendar';
import { TaskActionsMenu, EditTaskTitleForm, ActionItems, TaskResources, TaskComments, useTask } from '../';
import type { Session } from '~calendar';

interface TaskDetailsProps {
  session?: Session
};

export const TaskDetails = ({ session }: TaskDetailsProps) => {
  const { task } = useTask();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const { updateSelectedSession, setSelectedSession } = useSessions();
  const handleSessionChange = async (start: Date, end: Date) => {
    if (session && updateSelectedSession) {
      const _session = { ...session, start, end };
      setSelectedSession(_session);
      await updateSelectedSession(_session);
    }
  };

  return (
    <div className="p-4">
      {session && (
        <div className="flex space-x-4 border border-white/10 p-2 -m-2 mb-2.5 rounded-md">
          <TimeInterval start={session.start} end={session.end} onChange={handleSessionChange} />
        </div>
      )}
      <div className="flex space-x-2">
        <div className="flex-1">
          {isTitleEditing
            ? <EditTaskTitleForm onClose={() => setIsTitleEditing(false)} />
            : <h2 onClick={() => setIsTitleEditing(true)}>{task.name}</h2>
          }
        </div>
        <div className="mt-1">
          <TaskActionsMenu onEdit={() => setIsTitleEditing(true)} />
        </div>
      </div>

      <div className="flex-col space-y-4 mt-1">
        <TaskResources />
        <NoteEditor noteId={`task-${task.id}`} />
        <div className="h-[1px] w-20 bg-gradient-to-r from-slate-200 opacity-70 " />

        <ActionItems />
        <div className="h-[1px] w-20 bg-gradient-to-r from-slate-200 opacity-70" />

        <TaskComments />
      </div>
    </div>
  );
};
