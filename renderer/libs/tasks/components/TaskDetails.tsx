import React, { useState } from 'react';
import { NoteEditor } from '~notes';
import { TaskActionsMenu, EditTaskTitleForm, ActionItems, TaskResources, TaskComments } from '../';
import type { Task } from '../';

interface TaskDetailsProps {
  task: Task
};

export const TaskDetails = ({ task }: TaskDetailsProps) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  return (
    <div className="p-4">
      <div className="flex space-x-2">
        <div className="flex-1">
          {isTitleEditing
            ? <EditTaskTitleForm task={task} onClose={() => setIsTitleEditing(false)} />
            : <h2 onClick={() => setIsTitleEditing(true)}>{task.name}</h2>
          }
        </div>
        <div className="mt-1">
          <TaskActionsMenu task={task} onEdit={() => setIsTitleEditing(true)} />
        </div>
      </div>

      <div className="flex-col space-y-4 mt-1">
        <TaskResources task={task} />
        <NoteEditor noteId={`task-${task.id}`} />
        <div className="h-[1px] w-20 bg-gradient-to-r from-slate-200 opacity-70 " />
        <ActionItems task={task} />
        <div className="h-[1px] w-20 bg-gradient-to-r from-slate-200 opacity-70" />
        <TaskComments task={task} />
      </div>
    </div>
  );
};
