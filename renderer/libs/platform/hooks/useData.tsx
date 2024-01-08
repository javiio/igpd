import React, {
  useState,
  useContext,
  createContext,
  useEffect,
} from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc as addFirebaseDoc,
  setDoc as setFirebaseDoc,
  updateDoc as updateFirebaseDoc,
  deleteDoc as deleteFirebaseDoc,
  arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  useCollection as useFirebaseCollection,
  useDocument as useFirebaseDoc,
  useDocumentOnce as useFirebaseDocOnce,
} from 'react-firebase-hooks/firestore';
import firebaseConfig from '../config/firebase.config';

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

const dataContext = createContext({
  currentUser: null,
});

export const ProvideData = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
      }
    });
  }, []);

  const useCollection = (path: string) =>
    useFirebaseCollection(
      collection(getFirestore(firebaseApp), `users/${currentUser.id}/${path}`),
      { snapshotListenOptions: { includeMetadataChanges: true } }
    );

  const useDoc = (...path: string[]) => {
    return useFirebaseDoc(
      doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
      { snapshotListenOptions: { includeMetadataChanges: true } }
    );
  };

  const useDocOnce = (...path: string[]) => {
    return useFirebaseDocOnce(
      doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path)
    );
  };

  const addDoc = async (data: object, ...path: string[]) => {
    await addFirebaseDoc(
      collection(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
      data
    );
  };

  const setDoc = async (data: object, ...path: string[]) => {
    await setFirebaseDoc(
      doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
      data,
      { merge: true }
    );
  };

  const updateDoc = async (data: object, ...path: string[]) => {
    const docRef = doc(
      getFirestore(firebaseApp),
      `users/${currentUser.id}`,
      ...path
    );
    await updateFirebaseDoc(docRef, data);
  };

  const addItemToArrayDoc = async (
    data: any,
    attribute: string,
    ...path: string[]
  ) => {
    const docRef = doc(
      getFirestore(firebaseApp),
      `users/${currentUser.id}`,
      ...path
    );
    await updateFirebaseDoc(docRef, { [attribute]: arrayUnion(data) });
  };

  const deleteDoc = async (...path: string[]) => {
    await deleteFirebaseDoc(
      doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path)
    );
  };

  const value = {
    currentUser,
    useCollection,
    useDoc,
    useDocOnce,
    addDoc,
    setDoc,
    updateDoc,
    addItemToArrayDoc,
    deleteDoc,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export const useData = () => useContext(dataContext);
