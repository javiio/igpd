import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import cn from 'classnames';
import { ProjectForm, useProjects, type Project } from '..';
import { Icon } from '~core-ui';

export const Projects = () => {
  // https://github.com/ValentinH/react-easy-sort
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const { projects } = useProjects();

  const handleSelectProject = (project: Project | undefined) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  return (
    <LayoutGroup>
      <h1>Projects</h1>
      <div className="grid grid-cols-4 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={project.id}
            className={cn(
              'border border-l-6 rounded-lg px-4 py-2 h-24 flex space-x-3 cursor-pointer',
              `border-${project.color} bg-${project.color}/10 hover:bg-${project.color}/25`
            )}
            onClick={() => handleSelectProject(project)}
          >
            <Icon name={project.icon} className="mt-1.5" />
            <h3>{project.name}</h3>
          </motion.div>
        ))}
        <motion.div
          className="border rounded-lg px-4 py-2 h-24 border-dashed flex space-x-3 bg-slate-700/10 hover:bg-slate-700/25 cursor-pointer"
          layoutId="new_project"
          onClick={() => handleSelectProject(undefined)}
        >
          <Icon name="plus" className="mt-1.5" />
          <h3>New Project</h3>
          </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div className="absolute inset-0">
              <motion.div
                layoutId={selectedProject?.id ?? 'new_project'}
                className="w-96 m-auto mt-64 z-10"
              >
                <ProjectForm
                  project={selectedProject}
                  onClose={() => setShowForm(false)}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
