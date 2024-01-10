import React, { useState } from 'react';
import { useAuth } from '~auth';
import { Button, IconButton, Drawer } from '~core-ui';

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div>
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
      >
        <Button onClick={logout} className="mt-12" variant="link">Logout</Button>
      </Drawer>

      <div className="absolute top-6 left-16">
        <IconButton name="menu" onClick={() => setIsDrawerOpen(true)} />
      </div>

      <div className="absolute w-64 top-12 bottom-12 left-12 rounded-lg bg-slate-700">
      </div>

      <main className="mt-28 ml-[304px]">
        {children}
      </main>
    </div>
  );
};
