import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Error signing in with Google';
    return {
      ok: false,
      errorMessage,
    };
  }
};

interface emailAndPassword {
  email: string;
  password: string;
  displayName: string;
}

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
  displayName,
}: emailAndPassword) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Error signing in with Google';
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Error signing in with Google';
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
