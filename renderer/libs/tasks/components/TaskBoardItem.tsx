import React from 'react';
import cn from 'classnames';
import { useTasks } from '../';
import type { Task } from '../';

interface TaskBoardItemProps {
  task: Task
};

export const TaskBoardItem = ({ task }: TaskBoardItemProps) => {
  const { selectedTask, setSelectedTask } = useTasks();

  return (
    <div
      className={cn(
        'bg-gray-800 rounded-md p-2 text-sm border border-transparent cursor-pointer hover:bg-gray-800/80 transition-all',
        selectedTask?.id === task.id ? 'border-yellow-400' : 'hover:border-slate-400'
      )}
      onClick={() => setSelectedTask(task)}
    >
      {task.name}
    </div>
  );
};
