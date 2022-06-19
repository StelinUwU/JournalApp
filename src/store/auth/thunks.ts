import { checkingCredentials, login, logout } from './authSlice';
import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { IUser } from '../../interfaces';
import { clearNotesOnLogout } from '../journal';

export const checkingAuthentication = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage!));

    dispatch(login(result as IUser));
  };
};

export const startCreatingUserWithEmailAndPassword = (
  email: string,
  password: string,
  displayName: string
) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({
        email,
        password,
        displayName,
      });

    if (!ok || !uid) return dispatch(logout(errorMessage!));

    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLoginWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailAndPassword(email, password);

    if (!ok || !uid) return dispatch(logout(errorMessage!));

    dispatch(login({ uid, email, displayName: displayName!, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch: any) => {
    try {
      await logoutFirebase();
      dispatch(logout(null));
      dispatch(clearNotesOnLogout());
    } catch (error) {}
  };
};
