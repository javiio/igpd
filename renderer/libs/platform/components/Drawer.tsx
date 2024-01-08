import React from 'react';
import cn from 'classnames';

interface DrawerProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
};

export const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  return (
    <main
      className={cn(
        'fixed overflow-hidden z-10 bg-gray-950/50 inset-0 transform ease-in-out',
        isOpen
          ? 'transition-opacity opacity-100 duration-500 translate-x-0'
          : 'transition-all delay-500 opacity-0 -translate-x-full'
      )}
    >
      <section
        className={cn(
          'w-screen max-w-xs left-0 absolute bg-slate-200 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform',
          isOpen ? 'translate-x-0 ' : '-translate-x-full'
        )}
      >
        <article className="relative w-screen max-w-xs pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full"
        onClick={() => setIsOpen(false)}
      ></section>
    </main>
  );
};
