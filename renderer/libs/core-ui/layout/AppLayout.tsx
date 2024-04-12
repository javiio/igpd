import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { DailyCalendar, OnGoingSession } from '~calendar';
import { SidebarMenu, IconButton } from '..';

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className="titlebar" />
      <div className="fixed w-full h-28 top-0 left-0 right-0 bg-slate-950/50 border-b border-b-slate-700">
        <div className="absolute top-3 right-0 bottom-0 left-96">
          <OnGoingSession />
        </div>
      </div>
      <div className="absolute w-80 top-6 bottom-12 left-12">
        <div className="flex space-x-2 mb-2 pl-0.5">
          <IconButton name="prev" size={4} onClick={() => setDate(addDays(date, -1))} />
          <IconButton name="next" size={4} onClick={() => setDate(addDays(date, 1))} />
          <div className="pl-2 text-sm">
            {format(date, 'eeee')}
          </div>
        </div>
        <div className="w-full rounded-lg bg-slate-800 border h-full border-slate-700 shadow-md overflow-y-auto">
          <DailyCalendar date={date} />
        </div>
      </div>
      <SidebarMenu />

      <main className="mt-28 ml-[368px]">
        {children}
      </main>
    </div>
  );
};
