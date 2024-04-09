import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useData } from '~platform';
import { useProjects } from '~projects';
import { useTasks } from '~tasks';
import { sessionToData, dataToDaily } from '../';
import type { Session, DailyRecord, DailyRecordData } from '../';

export const START_TIME = 0;
export const END_TIME = 24;
export const HEIGHT_PER_MINUTE = 1.4;
export const TIMES = Array.from(Array(END_TIME - START_TIME).keys()).map(
  (i) => `${i + START_TIME}:00`
);

export interface UseDailyData {
  daily?: DailyRecord
  schedule: Session[]
  sessions: Session[]
  addSchedule: (session: Session) => Promise<void>
  addSession: (session: Session) => Promise<void>
  updateSchedule: (session: Session, i: number) => Promise<void>
  updateSession: (session: Session, i: number) => Promise<void>
  isLoading: boolean
  error?: Error
}

export const useDaily = (date: Date): UseDailyData => {
  const [id, setId] = useState(format(date, 'yyyy-MM-dd'));
  const [daily, setDaily] = useState<DailyRecord | undefined>();
  const [schedule, setSchedule] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
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

  return {
    daily,
    schedule,
    sessions,
    addSchedule,
    addSession,
    updateSchedule,
    updateSession,
    isLoading,
    error,
  };
};
