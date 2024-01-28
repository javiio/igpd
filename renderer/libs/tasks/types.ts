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

export interface TaskData {
  id: string
  name: string
  projectId: string
  listId: string
  actionItems: ActionItemData[]
  resources: ResourceData[]
};

export interface Task extends TaskData {}
