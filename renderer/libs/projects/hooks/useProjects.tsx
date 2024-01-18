import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import type { FirestoreError } from 'firebase/firestore';
import { useData } from '~platform';
import type { Project, ProjectData } from '../';

const DEFAULT_PROJECT: Project = {
  id: 'inbox',
  name: 'Inbox',
  color: 'gray-400',
  icon: 'inbox',
  lists: [],
};

interface ProjectContext {
  projects: Project[]
  isLoading: boolean
  error?: FirestoreError
  getProject: (projectId?: string) => Project
  addProject: (project: Project) => Promise<void>
  updateProject: (project: Project) => Promise<void>
};

const projectContext = createContext<ProjectContext>({
  projects: [],
  isLoading: false,
  getProject: () => DEFAULT_PROJECT,
  addProject: async () => await Promise.resolve(),
  updateProject: async () => await Promise.resolve(),
});

export const ProvideProjects = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { useCollection, setDoc, updateDoc } = useData();
  const [data, isLoading, error] = useCollection('projects');

  useEffect(() => {
    if (data) {
      const _projects: Project[] = data.docs
        .map((doc): Project => ({ ...doc.data() as ProjectData }))
        .filter((p) => p.active);
      setProjects(_projects);
    }
  }, [data]);

  const getProject = useCallback((projectId?: string) => {
    return projects.find((p) => p.id === projectId) ?? DEFAULT_PROJECT;
  }, [projects]);

  const addProject = async (project: Project) => {
    await setDoc(project, 'projects', project.id);
  };

  const updateProject = async (project: Project) => {
    await updateDoc(project, 'projects', project.id);
  };

  const value = {
    projects,
    isLoading,
    error,
    getProject,
    addProject,
    updateProject,
  };

  return (
    <projectContext.Provider value={value}>
      {children}
    </projectContext.Provider>
  );
};

export const useProjects = () => useContext(projectContext);
