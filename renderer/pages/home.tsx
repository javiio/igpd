import React from 'react';
import Head from 'next/head';
import { useAuth } from '~auth';
import { Button } from '~platform';

export default () => {
  const { logout } = useAuth();

  return (
    <React.Fragment>
      <Head>
        <title>get purpose done</title>
      </Head>
      <h1>Home</h1>
      <Button onClick={logout}>Logout</Button>
    </React.Fragment>
  );
};
