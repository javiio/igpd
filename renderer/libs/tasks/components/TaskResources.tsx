import React, { useState, useEffect } from 'react';
import { Menu, RadioGroup, Transition } from '@headlessui/react';
import { Icon, ActionModal, Input, Label, IconButton } from '~core-ui';
import { useTask } from '../';
import type { Task, ResourceData } from '../';

interface TaskResourcesProps {
  task: Task
}

export const TaskResources = ({ task }: TaskResourcesProps) => {
  const { update } = useTask(task);
  const [resources, setResources] = useState<ResourceData[]>(task.resources ?? []);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<ResourceData['type']>('link');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [clickedResource, setClickedResource] = useState<ResourceData | undefined>();

  useEffect(() => {
    setResources(task.resources ?? []);
  }, [task]);

  const handleOnSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);
    if (selectedIndex !== -1) {
      const newResources = [...resources];
      newResources[selectedIndex] = { title, url, type };
      await update({ resources: newResources });
    } else {
      await update({ resources: [...resources, { title, url, type }] });
    }

    setIsLoading(false);
    setShowModal(false);
  };

  const handleOnClick = async (resource: ResourceData) => {
    setClickedResource(undefined);
    if (resource.type === 'link') {
      window.shell.openExternal(resource.url)
        .catch((e) => console.log('Error opening link', resource.url, e));
    } else {
      await navigator.clipboard.writeText(resource.url);
      setClickedResource(resource);
    }
  };

  const handleEditOrCreate = (index: number) => {
    setSelectedIndex(index);
    const resource = resources[index];
    setUrl(resource?.url ?? '');
    setTitle(resource?.title ?? '');
    setType(resource?.type ?? 'link');
    setShowModal(true);
  };

  const handleRemove = async (i: number) => {
    const _resources = [...resources];
    _resources.splice(i, 1);
    setResources(_resources);
    await update({ resources: _resources });
  };

  return (
    <div className="flex space-x-2">
      {resources.map((resource, i) => {
        return (
        <div
          key={`${resource.title}-${i}`}
          onClick={async () => await handleOnClick(resource)}
          className="rounded-lg bg-slate-950 px-2 flex items-center space-x-2 h-6 hover:bg-opacity-60 cursor-pointer hover:pr-6 transition-all group relative"
        >
          <Icon
            className=""
            name={
              clickedResource?.url === resource?.url
                ? 'check'
                : resource.type === 'link' ? 'external' : 'copy'
            }
            size={3}
          />
          <span className="text-white">{resource.title}</span>
          <Menu as="div" className="block text-left" onClick={(e) => e.stopPropagation()}>
            <Menu.Button className="absolute top-0.5 right-1 hidden group-hover:block transition-all" onClick={(e) => e.stopPropagation()} as="span">
              <IconButton name="more" size={4} />
            </Menu.Button>
            <Transition
              as={React.Fragment}
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
                        onClick={(e) => handleEditOrCreate(i)}
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
                        onClick={async () => await handleRemove(i)}
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
        </div>
      )})}
      <div
        onClick={(e) => handleEditOrCreate(-1)}
        className="rounded-lg bg-slate-950 px-2 flex items-center space-x-2 h-6 hover:opacity-70 cursor-pointer"
      >
        <Icon className="text-slate-400" name="link" size={3} />
        <Icon name="plus" className="text-white" size={3} />
      </div>
      <ActionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleOnSubmit}
        isConfirmLoading={isLoading}
        title="Add a link"
      >
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col space-y-4"
        >
          <div className="flex items-center">
            <Label className="w-20">URL</Label>
            <Input autoFocus placeholder="Url..." value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <div className="flex items-center">
            <Label className="w-20">Name</Label>
            <Input placeholder="Name..." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Default action</Label>
            <RadioGroup value={type} onChange={setType}>
              <RadioGroup.Option value="link">
                {({ checked }) => (
                  <span className={checked ? 'bg-blue-200' : ''}>Open link in browser</span>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="text">
                {({ checked }) => (
                  <span className={checked ? 'bg-blue-200' : ''}>Copy text to clipboard</span>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </div>
        </form>
      </ActionModal>
    </div>
  );
};
