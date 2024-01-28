export interface ActionItemData {
  title: string
  completed: boolean
  subItems?: ActionItemData[]
}

export interface ResourceData {
  title: string
  url: string
  type: 'link' | 'file' | 'text'
}

export interface CommentData {
  body: string
}

export interface TaskData {
  id: string
  name: string
  projectId: string
  listId: string
  actionItems: ActionItemData[]
  resources: ResourceData[]
  comments: CommentData[]
};

export interface Task extends TaskData {}
