import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useData, auth } from '~platform';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useData();
  const router = useRouter();

  const login = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/home');
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const signup = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/home');
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {});
  };

  return {
    currentUser,
    login,
    signup,
    logout,
    isLoading,
  };
}