import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Label, Input, IconButton, Button } from '~core-ui';
import { type Project, useProjects, createProjectData } from '..';

interface ProjectFormProps {
  project?: Project
  onClose: () => void
}

export const ProjectForm = ({ project, onClose }: ProjectFormProps) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addProject, updateProject } = useProjects();

  useEffect(() => {
    if (project) {
      setName(project.name);
      setColor(project.color);
      setIcon(project.icon);
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (project) {
      await updateProject({ ...project, name, color, icon });
    } else {
      await addProject(createProjectData({ name, color, icon }));
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-4 rounded-lg border border-slate-700 bg-slate-800 relative">
      <IconButton
        name="x"
        onClick={onClose}
        type="button"
        size={6}
        className="absolute top-2 right-2"
      />
      <h2>{project ? 'Edit Project' : 'New Project'}</h2>
      <div className={cn(
        'grid grid-cols-1 gap-6',
        project ? `border-${project.color}` : 'border-dashed border-gray-400'
      )}>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label>Color</Label>
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <Label>Icon</Label>
          <Input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="col-span-2"
        >Create</Button>
      </div>
    </form>
  );
};
