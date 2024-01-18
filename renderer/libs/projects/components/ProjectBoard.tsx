import React from 'react';
import { ProjectBoardList, type Project } from '..';
import { useTasks } from '~tasks';

interface ProjectBoardProps {
  project: Project
};

export const ProjectBoard = ({ project }: ProjectBoardProps) => {
  const { listsTasks } = useTasks();

  return (
    <div className="overflow-x-auto h-[calc(100vh-11.5rem)]">
      <div className="flex space-x-2 px-4">
        {project?.lists?.map((list) => (
          <ProjectBoardList
            key={list.id}
            project={project}
            list={list}
            tasks={listsTasks.get(list.id)}
          />
        ))}
      </div>
    </div>
  );
};
