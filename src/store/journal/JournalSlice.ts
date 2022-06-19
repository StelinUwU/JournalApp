import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '../../interfaces';

export interface journalState {
  activeNote: INote | null;
  isSaving: boolean;
  messageSaved: string;
  notes: INote[];
}

const initialState: journalState = {
  activeNote: null,
  isSaving: false,
  messageSaved: '',
  notes: [],
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state: journalState) => {
      state.isSaving = true;
    },

    addNewEmptyNote: (
      state: journalState,
      { payload }: PayloadAction<INote>
    ) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state: journalState, { payload }: PayloadAction<INote>) => {
      state.activeNote = payload;
    },
    setNotes: (state: journalState, { payload }: PayloadAction<INote[]>) => {
      state.notes = payload;
    },
    setSaving: (
      state: journalState /* { payload }: PayloadAction<boolean> */
    ) => {
      state.isSaving = true;
    },
    updateNote: (state: journalState, { payload }: PayloadAction<INote>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
    },
    deleteNoteById: (
      state: journalState,
      { payload }: PayloadAction<string>
    ) => {
      state.notes = state.notes.filter((note) => note.id !== payload);
      state.activeNote = null;
    },
    setPhotosToActiveNote: (
      state: journalState,
      { payload }: PayloadAction<string[]>
    ) => {
      state.activeNote!.imagesUrls = [
        ...state.activeNote!.imagesUrls,
        ...payload,
      ];
      state.isSaving = false;
    },
    clearNotesOnLogout: () => initialState,
  },
});

export const {
  addNewEmptyNote,
  clearNotesOnLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
