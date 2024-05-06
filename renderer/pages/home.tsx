import React from 'react';
import Head from 'next/head';
import { ProjectsTabs, ProjectBoard, useProjects } from '~projects';
import { ResizablePanels } from '~core-ui';
import { TaskDetails, useTasks } from '~tasks';
import { useSessions } from '~calendar';

const Home = () => {
  const { selectedProject, setSelectedProject } = useProjects();
  const { selectedTask } = useTasks();
  const { selectedSession } = useSessions();

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
            <TaskDetails task={selectedTask} session={selectedSession} />
          )}
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Home;
