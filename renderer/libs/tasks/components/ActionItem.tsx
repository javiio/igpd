import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { IconButton } from '~core-ui';
import { InProgressWobble, useToday } from '~calendar';
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
  const { currentActionItem, setCurrentActionItem, isInProgress, toggleInProgress } = useToday();
  const isCurrentActionItem = currentActionItem === actionItem.title;
  const isActionItemInProgress = isInProgress && isCurrentActionItem;

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

  const handlePlay = () => {
    setCurrentActionItem(actionItem.title);
    if (!isInProgress) {
      toggleInProgress();
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex space-x-2 py-1 border border-transparent overflow-hidden hover:border-slate-600/50 hover:bg-slate-950/10 group rounded-md transition-colors',
          isCurrentActionItem && 'border-slate-600/50'
        )}
      >
        <div className="w-5 pl-1 pt-[3px]">
          <IconButton
            name="play"
            size={4}
            className="hidden group-hover:block"
            onClick={handlePlay}
          />
        </div>
        <div className="mt-[1px]">
          <input
            type="checkbox"
            checked={actionItem.completed}
            onClick={handleToggle}
            onChange={() => {}}
          />
        </div>

        <div className={cn(
          'flex-1',
          actionItem.completed && 'italic text-gray-400 line-through',
          isCurrentActionItem && 'text-yellow-600'
        )}>
          {actionItem.title}
        </div>

        <div className="pt-0.5 pr-1.5 h-6 w-12">
          {isActionItemInProgress && (
            <div className='group-hover:hidden mt-2'>
              <InProgressWobble />
            </div>
          )}
          <div className="text-right hidden group-hover:block">
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
        </div>
      </div>

      <div className="ml-6 text-sm">
        {actionItem.subItems?.map((subItem, i) => (
          <div className="flex space-x-2 py-0.5 mr-1 border border-transparent overflow-hidden hover:border-slate-600/50 hover:bg-slate-950/10 group rounded-md" key={i}>
            <div className="w-4 pl-1 pt-0.5">
              <IconButton
                name="play"
                size={3.5}
                className="hidden group-hover:block"
                onClick={() => setCurrentActionItem(subItem.title)}
              />
            </div>
            <input
              type="checkbox"
              checked={subItem.completed}
              onClick={async () => { await handleToggleSubItem(i); }}
              onChange={() => {}}
            />
            <div className={cn(
              subItem.completed && 'italic text-gray-400 line-through',
              currentActionItem === subItem.title && 'text-yellow-600'
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
