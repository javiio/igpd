import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '~auth';
import { Button, IconButton, Drawer } from '~platform';

const Home = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>Get purpose done</title>
      </Head>
      <Drawer
        isOpen={open}
        setIsOpen={setOpen}
      >
        <Button onClick={logout} className="mt-12" variant="link">Logout</Button>
      </Drawer>
      <div className="absolute top-6 left-16">
        <IconButton name="menu" onClick={() => setOpen(true)} />
      </div>
    </React.Fragment>
  );
};

export default Home;
