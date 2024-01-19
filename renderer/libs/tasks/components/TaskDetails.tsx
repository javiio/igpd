import React, { useState } from 'react';
import { TaskActionsMenu, EditTaskTitleForm } from '../';
import type { Task } from '../';

interface TaskDetailsProps {
  task: Task
};

export const TaskDetails = ({ task }: TaskDetailsProps) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  return (
    <div className="p-4">
      <div className="flex">
        {isTitleEditing
          ? <EditTaskTitleForm task={task} onClose={() => setIsTitleEditing(false)} />
          : <h2 className="flex-1">{task.name}</h2>
        }
        <TaskActionsMenu task={task} onEdit={() => setIsTitleEditing(true)} />
      </div>
    </div>
  );
};
