import React, { useState } from 'react';
import { Button, IconButton, Input } from '~core-ui';
import { useTask } from '../';

interface EditTaskTitleFormProps {
  onClose: () => void
}

export const EditTaskTitleForm = ({ onClose }: EditTaskTitleFormProps) => {
  const { task, update } = useTask();
  const [name, setName] = useState(task.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') return;
    setIsLoading(true);
    await update({ name });
    onClose();
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 rounded-lg -mt-1 -ml-2"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-2xl font-light px-2 py-1"
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
          Update
        </Button>
        <IconButton
          name="x"
          onClick={onClose}
        />
      </div>
    </form>
  );
};
