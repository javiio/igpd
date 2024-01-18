import React from 'react';
import type { Task } from '../';

interface TaskDetailsProps {
  task: Task
  onClose: () => void
};

export const TaskDetails = ({ task, onClose }: TaskDetailsProps) => {
  return (
    <div className="p-4" onClick={onClose}>
      <h2>{task.name}</h2>
    </div>
  );
};
