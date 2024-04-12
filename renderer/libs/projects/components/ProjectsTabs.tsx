import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { type Project, useProjects } from '..';

interface ProjectsTabsProps {
  project?: Project
  setProject: (project: Project) => void
}

export const ProjectsTabs: React.FC<ProjectsTabsProps> = ({ project, setProject }) => {
  const { projects } = useProjects();

  const handleSelectProject = (project: Project) => {
    setProject(project);
  };

  return (
    <div className="flex space-x-2 px-4 overflow-x-auto no-scrollbar">
      {projects
        .map((p: Project) => (
          <button
            key={p.id}
            type="button"
            onClick={() => { handleSelectProject(p); }}
            className={cn(
              'relative px-4 py-1.5 text-sm min-w-[78px] rounded-full border border-transparent shrink-0',
              p.id === project?.id ? '' : `hover:text-slate-300 hover:border-${p.color}/50`
            )}
          >
            {p.id === project?.id && (
              <motion.span
                layoutId="bubble"
                className={cn(
                  'absolute inset-0 mix-blend-difference rounded-full border -z-10',
                  `border-${p.color} bg-${p.color}/50`
                )}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {p.name}
          </button>
        ))}
    </div>
  );
};
