import { useData } from '~platform';
import type { Project, ProjectData } from '../';

export const useProject = (project: Project) => {
  const { updateDoc, deleteDoc } = useData();

  const update = async (data: Partial<ProjectData>) => {
    await updateDoc(data, 'projects', project.id);
  };

  const remove = async () => {
    await deleteDoc('projects', project.id);
  };

  return {
    update,
    remove,
  };
};
