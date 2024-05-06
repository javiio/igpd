import React, { useEffect, useState, useContext, createContext } from 'react';
import { getHours, getMinutes, getSeconds, isToday } from 'date-fns';
import { useDaily, calcTopPosition } from '../';
import type { Session } from '../';

interface TodayContext {
  currentTimePosition: number
  currentSession: Session | undefined
  remainingTime: number
  formattedTime: string
  isInProgress: boolean
  toggleInProgress: () => void
};

const todayContext = createContext<TodayContext>({
  currentTimePosition: 0,
  currentSession: undefined,
  remainingTime: 0,
  formattedTime: '',
  isInProgress: false,
  toggleInProgress: () => {},
});

export const ProvideToday = ({ children }: { children: React.ReactNode }) => {
  const [today, setToday] = useState(new Date());
  const { sessions, schedule, activityLogs, addActivityLog, updateActivityLog } = useDaily(today);
  const [currentSession, setCurrentSession] = useState<Session | undefined>();
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (!isToday(today)) {
        setToday(now);
      }
      setCurrentTimePosition(calcTopPosition(now));
      updateTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [today, currentSession]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInProgress) {
        updateCurrentSession();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isInProgress, sessions, schedule, currentSession]);

  const updateCurrentSession = () => {
    const now = new Date();
    let current = sessions.find((session) => session.start <= now && session.end >= now);
    if (!current) {
      current = schedule.find((session) => session.start <= now && session.end >= now);
    }
    if (
      current?.start !== currentSession?.start ||
      current?.end !== currentSession?.end ||
      current?.project.id !== currentSession?.project.id ||
      current?.task?.id !== currentSession?.task?.id
    ) {
      setCurrentSession(current);
    }
  };

  const updateTimer = () => {
    const now = new Date();
    if (currentSession) {
      const hours = getHours(currentSession.end) - getHours(now);
      const minutes = getMinutes(currentSession.end) - getMinutes(now);
      const seconds = getSeconds(currentSession.end) - getSeconds(now);
      const _remainingTime = hours * 60 * 60 + minutes * 60 + seconds;
      setRemainingTime(_remainingTime);
      const minutesStr = Math.floor(_remainingTime / 60).toString().padStart(2, '0');
      const secondsStr = (_remainingTime % 60).toString().padStart(2, '0');
      setFormattedTime(`${minutesStr}:${secondsStr}`);
    } else {
      setRemainingTime(0);
      setIsInProgress(false);
      setFormattedTime('00:00');
    }
  };

  const toggleInProgress = async () => {
    if (!currentSession) {
      return;
    }
    if (!isInProgress) {
      setIsInProgress(true);
      await addActivityLog({
        session: currentSession,
        start: new Date(),
      });
    } else {
      setIsInProgress(false);
      const lastActivityLog = activityLogs[activityLogs.length - 1];
      await updateActivityLog({
        ...lastActivityLog,
        end: new Date(),
      }, activityLogs.length - 1);
    }
  };

  const value = {
    currentSession,
    currentTimePosition,
    remainingTime,
    formattedTime,
    isInProgress,
    toggleInProgress,
  };

  return (
    <todayContext.Provider value={value}>
      {children}
    </todayContext.Provider>
  );
};

export const useToday = () => useContext(todayContext);
