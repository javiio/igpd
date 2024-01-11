import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useAuth } from '~auth';
import { Button, Drawer, Icon, IconButton } from '~core-ui';

export const SidebarMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/home', icon: 'menu' },
    { name: 'Projects', href: '/projects', icon: 'menu' },
  ];

  return (
    <div>
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
      >
        <nav className="flex flex-col space-y-4 pt-16 px-6 text-slate-900">
          {navItems.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
            >
              <a
                onClick={() => setIsDrawerOpen(false)}
                className={cn(
                  'flex space-x-3 hover:font-bold hover:pl-0.5 transition-all',
                  router.pathname === href
                    ? 'font-bold pl-0.5 border'
                    : ''
                )}
              >
                <Icon name={icon} size={6} />
                <span className="text-lg">{name}</span>
              </a>
            </Link>
          ))}
        </nav>
        <Button onClick={logout} className="mt-12" variant="link">Logout</Button>
      </Drawer>

      <div className="absolute top-6 left-16">
        <IconButton name="menu" onClick={() => setIsDrawerOpen(true)} />
      </div>
    </div>
  );
};
