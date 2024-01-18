import React, { useState } from 'react';
import { Button, IconButton, Input } from '~core-ui';
import type { Project, BoardList } from '~projects';
import { useTasks } from '../';

interface NewTaskFormProps {
  project: Project
  list: BoardList
  onClose: () => void
}

export const NewTaskForm = ({ onClose, project, list }: NewTaskFormProps) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') return;
    setIsLoading(true);
    await addTask({ name, project, list });
    setName('');
    onClose();
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-lg p-2"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-slate-100"
        placeholder="Task name..."
        autoFocus
      />
      <div className="flex space-x-2">
        <Button
          type="submit"
          isLoading={isLoading}
          size="sm"
          className="mt-2.5"
        >
          Add new
        </Button>
        <IconButton
          name="x"
          onClick={onClose}
        />
      </div>
    </form>
  );
};
