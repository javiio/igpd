import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useData } from '~platform';
import { useProjects } from '~projects';
import { useTasks } from '~tasks';
import { sessionToData, dataToDaily, activityLogToData } from '../';
import type { Session, DailyRecord, DailyRecordData, ActivityLog } from '../';

export const START_TIME = 0;
export const END_TIME = 24;
export const HEIGHT_PER_MINUTE = 1.85;
export const TIMES = Array.from(Array(END_TIME - START_TIME).keys()).map(
  (i) => `${i + START_TIME}:00`
);

export interface UseDailyData {
  daily?: DailyRecord
  schedule: Session[]
  sessions: Session[]
  activityLogs: ActivityLog[]
  addSchedule: (session: Session) => Promise<void>
  addSession: (session: Session) => Promise<void>
  updateSchedule: (session: Session, i: number) => Promise<void>
  updateSession: (session: Session, i: number) => Promise<void>
  removeSession: (i: number) => Promise<void>
  addActivityLog: (activity: ActivityLog) => Promise<void>
  updateActivityLog: (activity: ActivityLog, i: number) => Promise<void>
  isLoading: boolean
  error?: Error
}

export const useDaily = (date: Date): UseDailyData => {
  const [id, setId] = useState(format(date, 'yyyy-MM-dd'));
  const [daily, setDaily] = useState<DailyRecord | undefined>();
  const [schedule, setSchedule] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const { useDoc, setDoc, updateDoc, addItemToArrayDoc } = useData();
  const [data, isLoading, error] = useDoc('daily', id);
  const { getProject } = useProjects();
  const { getTask } = useTasks();

  useEffect(() => {
    setId(format(date, 'yyyy-MM-dd'));
  }, [date]);

  useEffect(() => {
    if (isLoading || error) {
      return;
    }

    const dailyData = data?.data() as DailyRecordData | undefined;
    const _daily = dailyData ? dataToDaily(dailyData, getProject, getTask) : undefined;
    setDaily(_daily);
    setSchedule(_daily?.schedule ?? []);
    setSessions(_daily?.planning ?? []);
    setActivityLogs(_daily?.activity ?? []);
  }, [id, data, isLoading, error, getProject, getTask]);

  const addSchedule = async (session: Session) => {
    if (isLoading || error) {
      return;
    }
    const data = sessionToData(session);
    if (daily) {
      await addItemToArrayDoc(data, 'schedule', 'daily', id);
    } else {
      await setDoc({ schedule: [data] }, 'daily', id);
    }
  };

  const addSession = async (session: Session) => {
    if (isLoading || error) {
      return;
    }
    const data = sessionToData(session);
    if (daily) {
      await addItemToArrayDoc(data, 'planning', 'daily', id);
    } else {
      await setDoc({ planning: [data] }, 'daily', id);
    }
  };

  const updateSchedule = async (session: Session, i: number) => {
    const _schedule = [...schedule];
    _schedule[i] = session;
    setSchedule(_schedule);
    await updateDoc({ schedule: _schedule.map(sessionToData) }, 'daily', id);
  };

  const updateSession = async (session: Session, i: number) => {
    const _sessions = [...sessions];
    _sessions[i] = session;
    setSessions(_sessions);
    await updateDoc({ planning: _sessions.map(sessionToData) }, 'daily', id);
  };

  const removeSession = async (i: number) => {
    const _sessions = [...sessions];
    _sessions.splice(i, 1);
    setSessions(_sessions);
    await updateDoc({ planning: _sessions.map(sessionToData) }, 'daily', id);
  };

  const addActivityLog = async (activity: ActivityLog) => {
    if (isLoading || error) {
      return;
    }

    const _activityLogs = [...activityLogs, activity];
    setActivityLogs(_activityLogs);

    const data = activityLogToData(activity);
    if (daily) {
      await addItemToArrayDoc(data, 'activity', 'daily', id);
    } else {
      await setDoc({ activity: [data] }, 'daily', id);
    }
  };

  const updateActivityLog = async (activity: ActivityLog, i: number) => {
    const _activityLogs = [...activityLogs];
    _activityLogs[i] = activity;
    setActivityLogs(_activityLogs);
    await updateDoc({ activity: _activityLogs.map(activityLogToData) }, 'daily', id);
  };

  return {
    daily,
    schedule,
    sessions,
    activityLogs,
    addSchedule,
    addSession,
    updateSchedule,
    updateSession,
    removeSession,
    addActivityLog,
    updateActivityLog,
    isLoading,
    error,
  };
};
