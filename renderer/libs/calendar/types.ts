import type { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';
import type { Task } from '~tasks';

export interface SessionData {
  start: Timestamp
  end: Timestamp
  projectId: string
  taskId?: string
};

export interface Session {
  start: Date
  end: Date
  project: Project
  task?: Task
}

export interface DailyRecordData {
  id: string
  schedule: SessionData[]
  planning: SessionData[]
};

export interface DailyRecord {
  id: string
  schedule: Session[]
  planning: Session[]
};
