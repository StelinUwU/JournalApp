import { RootState } from '../store';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from './JournalSlice';
import { INote } from '../../interfaces';
import { fileUpload, loadNotes } from '../../helpers';
import { setSnackbarMessage } from '../ui';
export const startNewNote = () => {
  return async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(savingNewNote());
      const { uid } = getState().auth;

      const newNote: INote = {
        title: '',
        body: '',
        date: new Date().getTime(),
        id: '',
        imagesUrls: [],
      };

      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

      const setDocResp = await setDoc(newDoc, newNote);

      newNote.id = newDoc.id;

      dispatch(addNewEmptyNote(newNote));
      dispatch(setActiveNote(newNote));
    } catch (error) {}
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: any, getState: () => RootState) => {
    try {
      const { uid } = getState().auth;

      if (!uid) throw new Error('No user found');

      const notes = await loadNotes(uid);

      dispatch(setNotes(notes));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSaveNote = (note: INote) => {
  return async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch(setSaving());
      dispatch(setActiveNote(note));
      const { uid } = getState().auth;
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      const { body, date, imagesUrls, title } = note;
      await setDoc(docRef, { body, date, imagesUrls, title }, { merge: true });
      dispatch(updateNote(note));
      dispatch(
        setSnackbarMessage({ message: 'Note updated', severity: 'success' })
      );
    } catch (error) {
      dispatch(
        setSnackbarMessage({ message: 'Error saving note', severity: 'error' })
      );
    }
  };
};

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: any) => {
    try {
      dispatch(setSaving());
      await fileUpload(files[0]);

      const fileUploadPromises = [];

      for (const file of files) {
        fileUploadPromises.push(fileUpload(file));
      }

      const photosUrls = await Promise.all(fileUploadPromises);

      dispatch(setPhotosToActiveNote(photosUrls));
      dispatch(
        setSnackbarMessage({
          message: 'Photos uploaded',
          severity: 'success',
        })
      );
    } catch (error) {
      dispatch(
        setSnackbarMessage({
          message: 'Error uploading file',
          severity: 'error',
        })
      );
    }
  };
};
export const startDeletingNote = () => {
  return async (dispatch: any, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;

    try {
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote?.id}`);

      const resp = await deleteDoc(docRef);
      dispatch(deleteNoteById(activeNote!.id));
      dispatch(
        setSnackbarMessage({ message: 'Note deleted', severity: 'success' })
      );
    } catch (error) {
      dispatch(
        setSnackbarMessage({
          message: 'Oops! Something went wrong',
          severity: 'error',
        })
      );
    }
  };
};
