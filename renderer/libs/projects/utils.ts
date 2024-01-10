import { uid } from '~platform';
import type { ProjectData } from './';

export const createProjectData = ({ name, color, icon }: { name: string, color: string, icon: string }): ProjectData => {
  return {
    id: uid(name),
    name,
    color,
    icon,
    active: true,
  };
};
