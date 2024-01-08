import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useData, auth } from '~platform';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useData();
  const router = useRouter();

  const login = (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await router.push('/home');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signup = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await router.push('/home');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(async () => {
        await router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    currentUser,
    login,
    signup,
    logout,
    isLoading,
  };
};
