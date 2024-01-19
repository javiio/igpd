import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IconButton, Icon } from '~core-ui';
import { useTask, type Task } from '../';

interface TaskActionsMenuProps {
  task: Task
  onEdit: () => void
};

export const TaskActionsMenu = ({ task, onEdit }: TaskActionsMenuProps) => {
  const { remove } = useTask(task);

  const handleOnRemove = async () => {
    await remove();
    // confirm({ onConfirm: remove });
  };

  return (
    <Menu as="div" className="relative block text-left">
      <Menu.Button as="span">
        <IconButton name="more" size={6} />
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
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-slate-900'
                  } group flex w-full space-x-3 items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Icon name="edit" size={3.5} />
                  <span>Edit</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleOnRemove}
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-slate-900'
                  } group flex w-full space-x-3 items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Icon name="remove" size={3.5} />
                  <span>Delete</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
