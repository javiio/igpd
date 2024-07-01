import type { Project, BoardList } from '~projects';

export interface ActionItemData {
  id: string
  title: string
  completed: boolean
  actionItems?: ActionItemData[]
  collapsed?: boolean
}

export interface ActionItem {
  id: string
  title: string
  completed: boolean
  actionItems: ActionItem[]
  collapsed?: boolean
}

export interface ResourceData {
  title: string
  url: string
  type: 'link' | 'file' | 'text'
}

export interface Resource extends ResourceData {}

export interface CommentData {
  body: string
}

export interface Comment extends CommentData {}

export interface TaskData {
  id: string
  name: string
  projectId: string
  listId: string
  actionItems: ActionItemData[]
  resources: ResourceData[]
  comments: CommentData[]
};

export interface Task {
  id: string
  name: string
  project: Project
  list: BoardList
  actionItems: ActionItem[]
  resources: Resource[]
  comments: Comment[]
}
