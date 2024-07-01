import React, { useState } from 'react';
import cn from 'classnames';
import { IconButton, ActionsMenu, Input, Button, Icon } from '~core-ui';
import { InProgressWobble, useToday } from '~calendar';
import { ActionItemsList, isActionItemCompleted, calcCompletedActionItems } from '..';
import type { ActionItem } from '..';

interface ActionItemsListItemProps {
  path: string[]
  actionItem: ActionItem
  onUpdate: (actionItem: ActionItem) => Promise<void>
  onToggle: (actionItem: ActionItem) => Promise<void>
  onRemove: (actionItem: ActionItem) => Promise<void>
  hideCompleted?: boolean
}

export const ActionItemsListItem = ({ path, actionItem, onUpdate, onToggle, onRemove, hideCompleted }: ActionItemsListItemProps) => {
  const [titleValue, setTitleValue] = useState(actionItem.title);
  const [editMode, setEditMode] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(!!actionItem.collapsed);
  const { currentActionItem, setCurrentActionItem, isInProgress, toggleInProgress } = useToday();
  const isCurrentActionItem = currentActionItem === actionItem.title;
  const isActionItemInProgress = isInProgress && isCurrentActionItem;
  const hasChilds = actionItem.actionItems.length > 0;
  const isCompleted = isActionItemCompleted(actionItem);

  if (hideCompleted && isCompleted) return null;

  const handleOnEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleValue.trim() === '') return;
    await onUpdate({ ...actionItem, title: titleValue });
    setEditMode(false);
  };

  const handlePlay = () => {
    setCurrentActionItem(actionItem.title);
    if (!isInProgress) {
      toggleInProgress();
    }
  };

  const handleCollapse = async () => {
    setIsCollapsed(!isCollapsed);
    await onUpdate({ ...actionItem, collapsed: !isCollapsed });
  };

  return (
    <div>
      <div
        className={cn(
          'flex space-x-2 py-1 border border-transparent hover:border-slate-600/50 hover:bg-slate-950/10 group rounded-md transition-colors',
          isCurrentActionItem && 'border-slate-600/50'
        )}
      >
        <div className="w-5 pl-1 pt-[3px]">
          {!hasChilds && (
            <IconButton
              name="play"
              size={4}
              className="hidden group-hover:block"
              onClick={handlePlay}
            />
          )}
        </div>
        <div className="mt-[1px]">
          {hasChilds
            ? <IconButton
                name={isCollapsed ? 'next' : 'down'}
                onClick={handleCollapse}
                className="-ml-1.5"
              />
            : <input
                type="checkbox"
                checked={actionItem.completed}
                onClick={async () => await onToggle(actionItem)}
                onChange={() => {}}
              />
          }
        </div>

        {!editMode && (
          <div
            className={cn(
              'flex-1',
              isCompleted && 'italic text-gray-400 line-through',
              isCurrentActionItem && 'text-yellow-600'
            )}
          >
            {actionItem.title}
          </div>
        )}

        {editMode && (
          <form
            onSubmit={handleOnEdit}
            className="flex-1 pr-2"
          >
            <Input
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              className="w-full px-2 py-1 mt-1"
              placeholder="Action Item..."
              autoFocus
            />
            <div className="flex space-x-2">
              <Button
                type="submit"
                size="sm"
                className="mt-2.5"
              >
                Update
              </Button>
              <IconButton
                name="x"
                onClick={() => setEditMode(false)}
              />
            </div>
          </form>
        )}

        {!editMode && (
          <div
            className={cn(
              'pt-0.5 pr-1.5 h-6 flex space-x-0',
              hasChilds ? 'w-32' : 'w-12'
            )}
          >
            <div className='mt-1 flex-1'>
              {isActionItemInProgress && <InProgressWobble />}
            </div>
            {hasChilds && (
              <>
                <div className="space-x-1 items-center flex opacity-50">
                  <Icon name="checkbox" size={4} />
                  <span>
                    {calcCompletedActionItems(actionItem.actionItems)}/{actionItem.actionItems.length}
                  </span>

                </div>

                <IconButton
                  name="plus"
                  onClick={() => setShowNewForm(true)}
                  className="hidden group-hover:block px-3"
                />
              </>
            )}
            <div className="w-0 group-hover:w-5">
              <ActionsMenu
                items={[
                  { icon: 'plus', name: 'Add sub item', onClick: () => setShowNewForm(true) },
                  { icon: 'edit', name: 'Edit', onClick: () => { setEditMode(true); } },
                  { icon: 'remove', name: 'Remove', onClick: async () => await onRemove(actionItem) },
                ]}
                showButtonOnlyOnGroupHover
              />
            </div>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="ml-8">
          <ActionItemsList
            path={[...path, actionItem.id]}
            actionItems={actionItem.actionItems ?? []}
            showNewForm={showNewForm}
            setShowNewForm={setShowNewForm}
            hideCompleted={hideCompleted}
          />
        </div>
      )}
    </div>
  );
};
