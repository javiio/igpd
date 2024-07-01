import React, { useState, useEffect } from 'react';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { Input, IconButton } from '~core-ui';
import { useTask, ActionItemsListItem } from '..';
import type { ActionItem } from '..';
import { uid } from '~platform';

interface ActionItemsListProps {
  path?: string[]
  actionItems: ActionItem[]
  showNewForm?: boolean
  setShowNewForm?: (show: boolean) => void
}

export const ActionItemsList = ({
  path = [],
  actionItems,
  showNewForm,
  setShowNewForm = () => {},
}: ActionItemsListProps) => {
  const { updateActionItems } = useTask();
  const [actionItemsClone, setActionItemsClone] = useState(actionItems);
  const [newTitle, setNewTitle] = useState('');
  const isRoot = path.length === 0;

  useEffect(() => {
    setActionItemsClone(actionItems);
  }, [actionItems]);

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleSubmitNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle.trim() === '') return;

    const _actionItems = [
      ...actionItemsClone,
      {
        id: uid(newTitle),
        title: newTitle,
        completed: false,
        actionItems: [],
      },
    ];

    setNewTitle('');
    setActionItemsClone(_actionItems);
    await updateActionItems(path, _actionItems);
  };

  const onUpdateActionItem = async (actionItem: ActionItem) => {
    const _actionItems = actionItemsClone.map((item) => {
      if (item.id === actionItem.id) {
        return actionItem;
      }
      return item;
    });

    setActionItemsClone(_actionItems);
    await updateActionItems(path, _actionItems);
  };

  const onToggleActionItem = async (actionItem: ActionItem) => {
    const _actionItems = actionItemsClone.map((item) => {
      if (item.id === actionItem.id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    setActionItemsClone(_actionItems);
    await updateActionItems(path, _actionItems);
  };

  const onRemoveActionItem = async (actionItem: ActionItem) => {
    const _actionItems = actionItemsClone.filter((item) => item.id !== actionItem.id);
    setActionItemsClone(_actionItems);
    await updateActionItems(path, _actionItems);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );
  const modifiers = [restrictToVerticalAxis, restrictToParentElement];
  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const activtIndex = actionItemsClone.findIndex((item) => item.id === active.id);
    const overIndex = actionItemsClone.findIndex((item) => item.id === over.id);
    const _actionItems = arrayMove(actionItemsClone, activtIndex, overIndex);

    setActionItemsClone(_actionItems);
    await updateActionItems(path, _actionItems);
  };

  return (
    <div className={isRoot ? '' : 'border-l border-slate-100/15'}>
      <DndContext
        sensors={sensors}
        modifiers={modifiers}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={actionItemsClone} strategy={verticalListSortingStrategy}>
          {actionItemsClone.map((actionItem, i) => (
            <ActionItemsListItem
              key={actionItem.id}
              path={path}
              actionItem={actionItem}
              onUpdate={onUpdateActionItem}
              onRemove={onRemoveActionItem}
              onToggle={onToggleActionItem}
            />
          ))}
        </SortableContext>
      </DndContext>

      {(isRoot || showNewForm) && (
        <form onSubmit={handleSubmitNew} className="flex space-x-2 mt-4 pb-4 ml-8 group">
          <Input
            value={newTitle}
            onChange={handleNewInputChange}
            placeholder="Add Action Item..."
            className="w-48 focus:flex-1 transition-all delay-100"
            onBlur={() => setShowNewForm(false)}
            autoFocus={!isRoot}
          />
          <IconButton name="plus" type="submit" className="hidden group-focus-within:block" />
          {!isRoot && (
            <IconButton name="x" className="hidden group-focus-within:block" onClick={() => setShowNewForm(false)} />
          )}
        </form>
      )}
    </div>
  );
};
