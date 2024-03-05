import { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';
import type { Task } from '~tasks';
import type { Session, SessionData, DailyRecord, DailyRecordData } from './types';

export const dataToDaily = (
  data: DailyRecordData,
  getProject: (id: string) => Project,
  getTask?: (id?: string) => Task | undefined
): DailyRecord => ({
  id: data.id,
  schedule: data.schedule?.map((session) => dataToSession(session, getProject)) ?? [],
  planning: data.planning?.map((session) => dataToSession(session, getProject, getTask)) ?? [],
});

export const dataToSession = (
  data: SessionData,
  getProject: (id: string) => Project,
  getTask?: (id?: string) => Task | undefined
): Session => ({
  start: data.start.toDate(),
  end: data.end.toDate(),
  project: getProject(data.projectId),
  task: data.taskId && getTask ? getTask(data.taskId) : undefined,
});

export const sessionToData = (session: Session): SessionData => ({
  start: Timestamp.fromDate(session.start),
  end: Timestamp.fromDate(session.end),
  projectId: session.project.id,
  ...(session.task && { taskId: session.task?.id }),
});
