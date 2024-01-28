import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { IconButton } from '~core-ui';
import type { Task, ActionItemData } from '..';

interface ActionItemProps {
  task: Task
  actionItem: ActionItemData
  index: number
  handleToggle: () => Promise<void>
  handleRemove: () => Promise<void>
  updateActionItem: (actionItem: ActionItemData) => Promise<void>
}

export const ActionItem = ({
  task,
  actionItem,
  index,
  handleToggle,
  handleRemove,
  updateActionItem,
}: ActionItemProps) => {
  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [subItems, setSubItems] = useState(actionItem.subItems ?? []);

  useEffect(() => {
    setSubItems(actionItem.subItems ?? []);
  }, [actionItem]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newSubItems = [
      ...(actionItem.subItems ?? []),
      { title, completed: false },
    ];
    setSubItems(newSubItems);
    const newActionItem = { ...actionItem, subItems: newSubItems };
    setTitle('');
    await updateActionItem(newActionItem);
  };

  const handleToggleSubItem = async (i: number) => {
    const buff = [...subItems];
    buff[i].completed = !buff[i].completed;
    setSubItems(buff);
    const newActionItem = { ...actionItem, subItems: buff };
    await updateActionItem(newActionItem);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <div className="flex space-x-2">
        <input
          type="checkbox"
          checked={actionItem.completed}
          onClick={handleToggle}
          onChange={() => {}}
        />

        <div className={cn(
          actionItem.completed && 'italic text-gray-400 line-through'
        )}>
          {actionItem.title}
        </div>
      </div>

      <div className="absolute right-2 top-[5px] hidden group-hover:flex space-x-2">
        <IconButton
          name="plus"
          size={4}
          onClick={() => { setShowForm(!showForm); }}
        />
        <IconButton
          name="remove"
          size={4}
          onClick={handleRemove}
        />
      </div>

      <div className="ml-12 text-sm">
        {actionItem.subItems?.map((subItem, i) => (
          <div className="flex space-x-2 mt-1" key={i}>
            <input
              type="checkbox"
              checked={subItem.completed}
              onClick={async () => { await handleToggleSubItem(i); }}
              onChange={() => {}}
            />
            <div className={cn(
              subItem.completed && 'italic text-gray-400 line-through'
            )}>
              {subItem.title}
            </div>
          </div>
        ))}

        {showForm && (
          <form onSubmit={handleSubmit} className="flex space-x-2 mt-2 mb-1 group">
            <input
              type="text"
              value={title}
              onChange={handleInputChange}
              placeholder="Add sub item..."
              className="bg-slate-900 px-2 py-1 w-48 focus:flex-1 transition-all focus:outline rounded-md delay-100 placeholder:text-slate-600"
            />
            <IconButton name="plus" type="submit" className="hidden group-focus-within:block" />
          </form>
        )}
      </div>
    </div>
  );
};
