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
import { createTaskData, dataToTask } from '../';
import type { TaskData, Task } from '../';

interface TaskContext {
  tasks: Task[]
  listsItems: Record<string | number, Task[]>
  selectedTask?: Task
  setSelectedTask: (Task) => void
  isLoading: boolean
  error?: FirestoreError
  addTask: (object) => Promise<void>
  getTask: (taskId: string | undefined) => Task | undefined
  updateTask: (taskId: string, object) => Promise<void>
};

const tasksContext = createContext<TaskContext>({
  tasks: [],
  listsItems: {},
  isLoading: false,
  setSelectedTask: () => undefined,
  addTask: async () => {},
  getTask: () => undefined,
  updateTask: async () => {},
});

type ListsItems = Record<string | number, Task[]>;

export const ProvideTasks = ({ children }: { children: React.ReactNode }) => {
  const { useCollection, setDoc, updateDoc } = useData();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [listsItems, setListsItems] = useState<ListsItems>({});
  const [data, isLoading, error] = useCollection('tasks');
  const { projects, getProject } = useProjects();

  useEffect(() => {
    if (data && projects.length > 0) {
      const allTasks: Task[] = data.docs.map((doc) => dataToTask(doc.data() as TaskData, getProject));
      setTasks(allTasks);

      const _listsItems: ListsItems = {};
      allTasks.forEach((task) => {
        if (!task.list) return; // This happens when a project is not active
        const items = _listsItems[task.list.id] ?? [];
        _listsItems[task.list.id] = [...items, task];
      });
      setListsItems(_listsItems);

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

  const updateTask = async (taskId: string, data: Partial<TaskData>) => {
    await updateDoc(data, 'tasks', taskId);
  };

  const value = {
    tasks,
    listsItems,
    isLoading,
    error,
    addTask,
    selectedTask,
    setSelectedTask,
    getTask,
    updateTask,
  };

  return (
    <tasksContext.Provider value={value}>{children}</tasksContext.Provider>
  );
};

export const useTasks = () => useContext(tasksContext);
