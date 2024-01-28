import { uid } from '~platform';
import type { Project, BoardList } from '~projects';
import type { TaskData } from '.';

export const createTaskData = ({ name, project, list }: {
  name: string
  project: Project
  list: BoardList
}): TaskData => {
  return {
    id: uid(name),
    name,
    projectId: project.id,
    listId: list.id,
    actionItems: [],
    resources: [],
    comments: [],
  };
};
