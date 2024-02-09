import { uid } from '~platform';
import type { ProjectData } from './';

export const createProjectData = ({ name, color, icon }: { name: string, color: string, icon: string }): ProjectData => {
  return {
    id: uid(name),
    name,
    color,
    icon,
    lists: [{
      id: uid('Backlog'),
      name: 'Backlog',
      color: 'slate-400',
      icon,
    }, {
      id: uid('Next'),
      name: 'Next',
      color: 'yellow-500',
      icon,
    }, {
      id: uid('In-Progress'),
      name: 'In Progress',
      color: 'green-500',
      icon,
    }, {
      id: uid('Waiting'),
      name: 'Waiting',
      color: 'purple-500',
      icon,
    }, {
      id: uid('Done'),
      name: 'Done',
      color: 'orange-500',
      icon,
    }],
    active: true,
  };
};

export const createListData = ({ name, color, icon }: { name: string, color?: string, icon?: string }) => {
  return {
    id: uid(name),
    name,
    color: color ?? 'slate-400',
    icon: icon ?? 'list',
  };
};
