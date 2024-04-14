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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentSession();
    }, 1000);

    return () => clearInterval(interval);
  }, [sessions, schedule]);

  const updateCurrentSession = () => {
    const now = new Date();
    let current = sessions.find((session) => session.start <= now && session.end >= now);
    if (!current) {
      current = schedule.find((session) => session.start <= now && session.end >= now);
    }
    if (current) {
      const hours = getHours(current.end) - getHours(now);
      const minutes = getMinutes(current.end) - getMinutes(now);
      const seconds = getSeconds(current.end) - getSeconds(now);
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

    // TODO: check if current is different from currentSession
    setCurrentSession(current);
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
