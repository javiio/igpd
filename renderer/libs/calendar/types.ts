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

export interface ActivityLogData {
  session: SessionData
  start: Timestamp
  end?: Timestamp
}

export interface ActivityLog {
  session: Session
  start: Date
  end?: Date
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
