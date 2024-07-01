import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';
import { IconButton, Icon } from '~core-ui';

interface ActionsMenuProps {
  icon?: string
  items: Array<{
    icon?: string
    name: string
    onClick: () => void | Promise<void>
  }>
  showButtonOnlyOnGroupHover?: boolean
};

export const ActionsMenu = ({ icon = 'more', items, showButtonOnlyOnGroupHover = false }: ActionsMenuProps) => {
  return (
    <Menu as="div" className="relative block text-left">
      <Menu.Button
        as="span"
        className={cn(
          showButtonOnlyOnGroupHover ? 'opacity-0 group-hover:opacity-100' : ''
        )}
      >
        <IconButton name={icon} size={5} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-slate-900'
                    } group flex w-full space-x-2 items-center rounded-md px-2 py-2 text-xs`}
                  >
                    <Icon name={item.icon ?? 'minus'} size={3.5} />
                    <span>{item.name}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
