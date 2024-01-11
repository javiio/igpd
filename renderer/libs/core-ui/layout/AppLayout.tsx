import React from 'react';
import { SidebarMenu } from '..';

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <SidebarMenu />

      <div className="absolute w-64 top-12 bottom-12 left-12 rounded-lg bg-slate-700">
      </div>

      <main className="mt-28 ml-[304px]">
        {children}
      </main>
    </div>
  );
};
