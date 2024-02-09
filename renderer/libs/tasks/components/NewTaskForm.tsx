import React, { useState } from 'react';
import { Button, IconButton, Input } from '~core-ui';
import type { Project, BoardList } from '~projects';
import { useTasks } from '../';

interface NewTaskFormProps {
  project: Project
  list: BoardList
}

export const NewTaskForm = ({ project, list }: NewTaskFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') return;
    setIsLoading(true);
    await addTask({ name, project, list });
    setName('');
    setShowForm(false);
    setIsLoading(false);
  };

  return (
    <div>
      {!showForm
        ? (
          <Button
            onClick={() => setShowForm(true)}
            size="sm"
            className="text-slate-400 w-full hover:bg-slate-800/80 hover:no-underline hover:text-white mb-0 pl-0 hover:pl-2 transition-all"
            icon="plus"
            variant='link'
          >
            Add new task
          </Button>)
        : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 rounded-lg p-2"
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                onClick={() => setShowForm(false)}
              />
            </div>
          </form>)
      }
    </div>
  );
};
