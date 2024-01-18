import React, { useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { IconButton } from '~core-ui';
import { NewTaskForm, TaskBoardItem, type Task } from '~tasks';
import type { Project, BoardList } from '..';

interface ProjectBoardListProps {
  project: Project
  list: BoardList
  tasks?: Task[]
};

export const ProjectBoardList = ({ project, list, tasks }: ProjectBoardListProps) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <LayoutGroup>
      <div className="h-[calc(100vh-12.5rem)] shrink-0">
        <div className="w-64 bg-slate-950 rounded-lg">
          <div className="flex justify-between px-4 py-2">
            <h4 >{list.name}</h4>
            <IconButton
              name="plus"
              onClick={() => setShowAddForm(true)}
            />
          </div>

          <div className="p-2 flex flex-col space-y-3 overflow-y-auto max-h-[calc(100vh-15.5rem)] shrink-0 bg-slate-950 rounded-lg">
            {showAddForm && (
              <NewTaskForm
                project={project}
                list={list}
                onClose={() => setShowAddForm(false)}
              />
            )}
            {tasks?.map((task) => <TaskBoardItem key={task.id} task={task} />)}
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
};
