import React from 'react';
import Head from 'next/head';
import { ProjectsTabs, ProjectBoard, useProjects } from '~projects';
import { ResizablePanels } from '~core-ui';
import { TaskDetails, useTasks } from '~tasks';

const Home = () => {
  const { selectedTask } = useTasks();
  const { selectedProject, setSelectedProject } = useProjects();

  return (
    <React.Fragment>
      <Head>
        <title>Get purpose done</title>
      </Head>

      <ResizablePanels aSize="40%" bSize="60%">
        <div className="">
          <div className="px-2 py-4">
            <ProjectsTabs project={selectedProject} setProject={setSelectedProject} />
          </div>
          {selectedProject && <ProjectBoard project={selectedProject} />}
        </div>

        <div className="bg-slate-800 h-[calc(100vh-7.2rem)] overflow-auto">
          {selectedTask && (
            <TaskDetails task={selectedTask} />
          )}
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Home;
