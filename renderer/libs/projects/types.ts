export interface BoardList {
  id: string
  name: string
  color: string
  icon: string
};

export interface ProjectData {
  id: string
  name: string
  color: string
  icon: string
  lists: BoardList[]
  active?: boolean
};

export interface Project extends ProjectData {};
