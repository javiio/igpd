import { useData } from '~platform';
import type { Task, TaskData } from '../';

export const useTask = (task: Task) => {
  const { updateDoc, deleteDoc } = useData();

  const update = async (data: Partial<TaskData>) => {
    await updateDoc(data, 'tasks', task.id);
  };

  const remove = async () => {
    await deleteDoc('tasks', task.id);
  };

  return {
    update,
    remove,
  };
};
