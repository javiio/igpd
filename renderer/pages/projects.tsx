import React from 'react';
import Head from 'next/head';
import { Projects } from '~projects';

const ProjectsPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="p-4">
        <Projects />
      </div>
    </React.Fragment>
  );
};

export default ProjectsPage;
