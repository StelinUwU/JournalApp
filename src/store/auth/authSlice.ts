import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

type status = 'checking' | 'not-authenticated' | 'authenticated';

export interface authState {
  displayName: string | null;
  email: string | null;
  errorMessage: string | null;
  photoURL: string | null;
  status: status;
  uid: string | null;
}

const initialState: authState = {
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  status: 'checking',
  uid: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: authState, { payload }: PayloadAction<IUser>) => {
      state.displayName = payload.displayName;
      state.email = payload.email;
      state.photoURL = payload.photoURL!;
      state.status = 'authenticated';
      state.uid = payload.uid;
    },
    logout: (state: authState, { payload }: PayloadAction<string | null>) => {
      state.displayName = null;
      state.email = null;
      state.errorMessage = payload;
      state.photoURL = null;
      state.status = 'not-authenticated';
      state.uid = null;
    },
    checkingCredentials: (state: authState) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
