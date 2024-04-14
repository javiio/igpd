import { Timestamp } from 'firebase/firestore';
import type { Project } from '~projects';
import type { Task } from '~tasks';
import type { Session, SessionData, DailyRecord, DailyRecordData, ActivityLogData, ActivityLog } from './types';
import { START_TIME, HEIGHT_PER_MINUTE } from './';

export const dataToDaily = (
  data: DailyRecordData,
  getProject: (id: string) => Project,
  getTask?: (id?: string) => Task | undefined
): DailyRecord => ({
  id: data.id,
  schedule: data.schedule?.map((session) => dataToSession(session, getProject)) ?? [],
  planning: data.planning?.map((session) => dataToSession(session, getProject, getTask)) ?? [],
  activity: data.activity?.map((activity) => dataToActivityLog(activity, getProject, getTask)) ?? [],
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
  actionItem: data.actionItem,
});

export const sessionToData = (session: Session): SessionData => ({
  start: Timestamp.fromDate(session.start),
  end: Timestamp.fromDate(session.end),
  projectId: session.project.id,
  ...(session.task && { taskId: session.task?.id }),
  ...(session.actionItem && { actionItem: session.actionItem }),
});

export const dataToActivityLog = (
  data: ActivityLogData,
  getProject: (id: string) => Project,
  getTask?: (id?: string) => Task | undefined
): ActivityLog => ({
  session: dataToSession(data.session, getProject, getTask),
  start: data.start.toDate(),
  end: data.end?.toDate(),
});

export const activityLogToData = (activity: ActivityLog): ActivityLogData => ({
  session: sessionToData(activity.session),
  start: Timestamp.fromDate(activity.start),
  ...(activity.end && { end: Timestamp.fromDate(activity.end) }),
});

export const calcTopPosition = (date: Date): number =>
  ((date.getHours() - START_TIME) * 60 + date.getMinutes()) * HEIGHT_PER_MINUTE;
