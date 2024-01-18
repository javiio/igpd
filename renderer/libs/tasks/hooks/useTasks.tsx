import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { type FirestoreError } from 'firebase/firestore';
import { useData } from '~platform';
import { useProjects } from '~projects';
import { createTaskData } from '../';
import type { TaskData, Task } from '../';

interface TaskContext {
  tasks: Task[]
  listsTasks: Map<string, Task[]>
  selectedTask?: Task
  setSelectedTask: (Task) => void
  isLoading: boolean
  error?: FirestoreError
  addTask: (object) => Promise<void>
  getTask: (taskId: string | undefined) => Task | undefined
};

const tasksContext = createContext<TaskContext>({
  tasks: [],
  listsTasks: new Map(),
  isLoading: false,
  setSelectedTask: () => undefined,
  addTask: async () => {},
  getTask: () => undefined,
});

export const ProvideTasks = ({ children }: { children: React.ReactNode }) => {
  const { useCollection, setDoc } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [listsTasks, setListsTasks] = useState<Map<string, Task[]>>(new Map());
  const [data, isLoading, error] = useCollection('tasks');
  const { projects } = useProjects();

  useEffect(() => {
    if (data) {
      const allTasks: Task[] = data.docs.map((doc) => {
        const task = { ...(doc.data() as TaskData) };
        return task;
      });
      setTasks(allTasks);

      const _listsTasks = new Map<string, Task[]>();
      allTasks.forEach((task) => {
        const listTasks = _listsTasks.get(task.listId) ?? [];
        _listsTasks.set(task.listId, [...listTasks, task]);
      });
      setListsTasks(_listsTasks);

      if (selectedTask) {
        setSelectedTask(allTasks.find((t) => t.id === selectedTask.id));
      }
    }
  }, [data, projects]);

  const addTask = async ({ name, project, list }) => {
    const task = createTaskData({ name, project, list });
    await setDoc(task, 'tasks', task.id);
  };

  const getTask = useCallback(
    (taskId: string | undefined) => tasks?.find((t) => t.id === taskId),
    [tasks]
  );

  const value = {
    tasks,
    listsTasks,
    isLoading,
    error,
    addTask,
    selectedTask,
    setSelectedTask,
    getTask,
  };

  return (
    <tasksContext.Provider value={value}>{children}</tasksContext.Provider>
  );
};

export const useTasks = () => useContext(tasksContext);
