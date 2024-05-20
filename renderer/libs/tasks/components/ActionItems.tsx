import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import { Icon, IconButton } from '~core-ui';
import { useTask, ActionItem } from '..';
import type { Task, ActionItemData } from '..';

export const ActionItems = ({ task }: { task: Task }) => {
  const [title, setTitle] = useState('');
  const [actionItems, setActionItems] = useState(task.actionItems ?? []);
  const { update } = useTask(task);

  useEffect(() => {
    setActionItems(task.actionItems ?? []);
  }, [task]);

  const handleToggle = async (i: number) => {
    const _actionItems = [...actionItems];
    _actionItems[i].completed = !_actionItems[i].completed;
    setActionItems(_actionItems);
    await update({ actionItems: _actionItems });
  };

  const updateActionItem = async (actionItem: ActionItemData, i: number) => {
    const _actionItems = [...actionItems];
    _actionItems[i] = actionItem;
    setActionItems(_actionItems);
    await update({ actionItems: _actionItems });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const _actionItems = [...actionItems, { title, completed: false }];
    setActionItems(_actionItems);
    setTitle('');
    await update({ actionItems: _actionItems });
  };

  const handleRemove = async (i: number) => {
    const _actionItems = [...actionItems];
    _actionItems.splice(i, 1);
    setActionItems(_actionItems);
    setTitle('');
    await update({ actionItems: _actionItems });
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(actionItems);
    const [removed] = reorderedItems.splice(result.source.index as number, 1);
    reorderedItems.splice(result.destination.index as number, 0, removed);

    setActionItems(reorderedItems);
    await update({ actionItems: reorderedItems });
  };

  return (
    <div>
      <div className="flex space-x-2 items-center mb-2">
        <Icon name="actionItems" />
        <h3 className="font-extralight text-lg">Action Items</h3>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="actionItems">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-row space-y-0"
            >
              {actionItems.map((actionItem, i) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="-ml-1 overflow-hidden hover:bg-slate-950/15 transition-colors relative rounded-md"
                    >
                      <ActionItem
                        task={task}
                        actionItem={actionItem}
                        index={i}
                        handleToggle={async () => { await handleToggle(i); }}
                        handleRemove={async () => { await handleRemove(i); }}
                        updateActionItem={async (item: ActionItemData) => { await updateActionItem(item, i); }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <form onSubmit={handleSubmit} className="flex space-x-2 mt-4 ml-1 group">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Add Action Item..."
          className="bg-slate-900 px-2 py-1 w-48 focus:flex-1 transition-all focus:outline rounded-md delay-100 placeholder:text-slate-600"
        />
        <IconButton name="plus" type="submit" className="hidden group-focus-within:block" />
      </form>
    </div>
  );
};
