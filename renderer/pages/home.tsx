import React, { useState } from 'react';
import Head from 'next/head';
import { ProjectsTabs, ProjectBoard, type Project } from '~projects';

const Home = () => {
  const [project, setProject] = useState<Project>();

  return (
    <React.Fragment>
      <Head>
        <title>Get purpose done</title>
      </Head>

      <div className="">
        <div className="px-2 py-4">
          <ProjectsTabs project={project} setProject={setProject} />
        </div>
        <ProjectBoard project={project} />
      </div>
    </React.Fragment>
  );
};

export default Home;
