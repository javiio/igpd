import type { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';
import type { Task } from '~tasks';

export interface SessionData {
  start: Timestamp
  end: Timestamp
  projectId: string
  taskId?: string
  actionItem?: string
};

export interface Session {
  start: Date
  end: Date
  project: Project
  task?: Task
  actionItem?: string
}

export enum ActivityLogAction {
  Start = 'Start',
  Pause = 'Pause'
}

export interface ActivityLogData {
  action: ActivityLogAction
  createdAt: Timestamp
  session: SessionData
}

export interface ActivityLog {
  action: ActivityLogAction
  createdAt: Date
  session: Session
}

export interface DailyRecordData {
  id: string
  schedule: SessionData[]
  planning: SessionData[]
  activity: ActivityLogData[]
};

export interface DailyRecord {
  id: string
  schedule: Session[]
  planning: Session[]
  activity: ActivityLog[]
};
