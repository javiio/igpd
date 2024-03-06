import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useData } from '~platform';
import { useProjects } from '~projects';
import { useTasks } from '~tasks';
import { sessionToData, dataToDaily } from '../';
import type { Session, DailyRecord, DailyRecordData } from '../';

export const useDaily = (date: Date) => {
  const id = format(date, 'yyyy-MM-dd');
  const [daily, setDaily] = useState<DailyRecord | undefined>();
  const [schedule, setSchedule] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const { useDoc, setDoc, updateDoc, addItemToArrayDoc } = useData();
  const [data, isLoading, error] = useDoc('daily', id);
  const { getProject } = useProjects();
  const { getTask } = useTasks();

  useEffect(() => {
    if (isLoading || error) {
      return;
    }

    const dailyData = data?.data() as DailyRecordData | undefined;
    const _daily = dailyData ? dataToDaily(dailyData, getProject, getTask) : undefined;
    setDaily(_daily);
    setSchedule(_daily?.schedule ?? []);
    setSessions(_daily?.planning ?? []);
  }, [date, data, isLoading, error, getProject, getTask]);

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
