import React from 'react';
import { DailyCalendar } from '~calendar';
import { SidebarMenu } from '..';

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <div className="fixed w-full h-28 top-0 left-0 right-0 bg-slate-950/50 border-b border-b-slate-700" />
      <div className="absolute w-64 top-12 bottom-12 left-12 rounded-lg bg-slate-800 border-slate-700 border shadow-md overflow-y-auto">
        <DailyCalendar date={new Date()} />
      </div>
      <SidebarMenu />

      <main className="mt-28 ml-[304px]">
        {children}
      </main>
    </div>
  );
};
