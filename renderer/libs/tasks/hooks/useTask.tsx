import React, { createContext, useContext } from 'react';
import { useData } from '~platform';
import type { Task, TaskData, ActionItem } from '../';

interface TaskContext {
  task: Task
  update: (data: Partial<TaskData>) => Promise<void>
  updateActionItems: (path: string[], actionItems: ActionItem[]) => Promise<void>
  remove: () => Promise<void>
}

const taskContext = createContext<TaskContext>({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  task: {} as Task,
  update: async () => {},
  updateActionItems: async () => {},
  remove: async () => {},
});

export const ProvideTask = ({ task, children }: { task: Task, children: React.ReactNode }) => {
  const { updateDoc, deleteDoc } = useData();

  const update = async (data: Partial<TaskData>) => {
    await updateDoc(data, 'tasks', task.id);
  };

  const updateActionItems = async (path: string[], actionItems: ActionItem[]) => {
    const updateNestedActionItems = (currentActionItems: ActionItem[], path: string[]): ActionItem[] => {
      if (path.length === 0) {
        return actionItems;
      }

      const [currentId, ...remainingPath] = path;
      return currentActionItems.map(actionItem => {
        if (actionItem.id === currentId) {
          return {
            ...actionItem,
            actionItems: updateNestedActionItems(actionItem.actionItems, remainingPath),
          };
        }
        return actionItem;
      });
    };

    const updatedActionItems = updateNestedActionItems(task.actionItems, path);

    await update({ actionItems: updatedActionItems });
  };

  const remove = async () => {
    await deleteDoc('tasks', task.id);
  };

  const value = {
    task,
    update,
    updateActionItems,
    remove,
  };

  return (
    <taskContext.Provider value={value}>
      {children}
    </taskContext.Provider>
  );
};

export const useTask = () => useContext(taskContext);
