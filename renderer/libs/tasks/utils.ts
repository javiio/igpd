import { uid } from '~platform';
import type { Project, BoardList } from '~projects';
import type { TaskData, ActionItem, ActionItemData } from '.';

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

export const dataToTask = (
  data: TaskData,
  getProject: (id: string) => Project
) => {
  const project = getProject(data.projectId);
  const list = project.lists.find((l) => l.id === data.listId);
  return ({
    id: data.id,
    name: data.name,
    project,
    list,
    actionItems: dataToActionsItems(data.actionItems),
    resources: data.resources,
    comments: data.comments,
  });
};

export const dataToActionsItems = (data: ActionItemData[]) => {
  return data?.map((item) => ({
    id: item.id,
    title: item.title,
    completed: item.completed,
    actionItems: item.actionItems ? dataToActionsItems(item.actionItems) : [],
    collapsed: !!item.collapsed,
  }));
};

export const isActionItemCompleted = (actionItem: ActionItem): boolean => {
  if (actionItem.actionItems.length === 0) {
    return actionItem.completed;
  }

  return actionItem.actionItems.every(isActionItemCompleted);
};

export const calcCompletedActionItems = (actionItems: ActionItem[]) => {
  return actionItems.filter(isActionItemCompleted).length;
};
