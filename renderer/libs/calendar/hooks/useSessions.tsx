import React, { useState, useContext, createContext } from 'react';
import type { Session } from '../';

type UpdateSession = (session: Session) => Promise<void>;

interface SessionsContext {
  selectedSession: Session | undefined
  setSelectedSession: (session: Session) => void
  updateSelectedSession?: UpdateSession
  setUpdateSelectedSession: (UpdateSession) => void
};

const sessionsContext = createContext<SessionsContext>({
  selectedSession: undefined,
  setSelectedSession: () => {},
  updateSelectedSession: async () => await Promise.resolve(),
  setUpdateSelectedSession: () => async () => await Promise.resolve(),
});

export const ProvideSessions = ({ children }: { children: React.ReactNode }) => {
  const [selectedSession, setSelectedSession] = useState<Session | undefined>();
  const [updateSelectedSession, setUpdateSelectedSession] = useState<UpdateSession>();

  const value = {
    selectedSession,
    setSelectedSession,
    updateSelectedSession,
    setUpdateSelectedSession,
  };

  return (
    <sessionsContext.Provider value={value}>
      {children}
    </sessionsContext.Provider>
  );
};

export const useSessions = () => useContext(sessionsContext);
