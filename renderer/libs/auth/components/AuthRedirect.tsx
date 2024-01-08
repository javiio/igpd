import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../';

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === undefined && router.pathname !== '/login') {
      router.push('/login')
        .then(() => {})
        .catch((err) => console.error(err));
    }
  }, [currentUser, router.pathname]);

  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  return children;
};
