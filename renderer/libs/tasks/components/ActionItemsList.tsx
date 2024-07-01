import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import { Input, IconButton } from '~core-ui';
import { useTask, ActionItemsListItem } from '..';
import type { ActionItem } from '..';
import { uid } from '~platform';

interface ActionItemsListProps {
  path?: string[]
  actionItems: ActionItem[]
  showNewForm?: boolean
  setShowNewForm?: (show: boolean) => void
  hideCompleted?: boolean
}

export const ActionItemsList = ({
  path = [],
  actionItems,
  showNewForm,
  setShowNewForm = () => {},
  hideCompleted,
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

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(actionItems);
    const [removed] = reorderedItems.splice(result.source.index as number, 1);
    reorderedItems.splice(result.destination.index as number, 0, removed);

    setActionItemsClone(reorderedItems);
    await updateActionItems(path, reorderedItems);
  };

  return (
    <div className={isRoot ? '' : 'border-l border-slate-100/15'}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="actionItems">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-row space-y-0"
            >
              {actionItemsClone.map((actionItem, i) => (
                <Draggable key={actionItem.id} draggableId={actionItem.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="ml-0.5 hover:bg-slate-950/15 transition-colors relative rounded-md"
                    >
                      <ActionItemsListItem
                        path={path}
                        actionItem={actionItem}
                        onUpdate={onUpdateActionItem}
                        onRemove={onRemoveActionItem}
                        onToggle={onToggleActionItem}
                        hideCompleted={hideCompleted}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
