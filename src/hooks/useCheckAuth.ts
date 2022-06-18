import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { useAppDispatch, useAppSelector, logout, login } from '../store';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(null));

      const { uid, email, displayName, photoURL } = user;

      dispatch(
        login({ uid, email: email!, displayName: displayName!, photoURL })
      );
    });
  }, []);

  return status;
};
