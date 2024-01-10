import React from 'react';
import Head from 'next/head';
import { Projects } from '~projects';

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Get purpose done</title>
      </Head>
      <div className="p-4">
        <Projects />
      </div>
    </React.Fragment>
  );
};

export default Home;
