import React, { useState } from 'react';
import Head from 'next/head';
import { ProjectsTabs, ProjectBoard, type Project } from '~projects';
import { ResizablePanels } from '~core-ui';
import { TaskDetails, useTasks } from '~tasks';

const Home = () => {
  const [project, setProject] = useState<Project>();
  const { selectedTask } = useTasks();

  return (
    <React.Fragment>
      <Head>
        <title>Get purpose done</title>
      </Head>

      <ResizablePanels aSize="75%" bSize="25%">
        <div className="">
          <div className="px-2 py-4">
            <ProjectsTabs project={project} setProject={setProject} />
          </div>
          <ProjectBoard project={project} />
        </div>

        <div className="bg-slate-800 h-full">
          {selectedTask && (
            <TaskDetails task={selectedTask} />
          )}
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Home;
