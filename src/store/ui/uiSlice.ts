import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ISeverity = 'success' | 'error' | 'warning';

export interface uiState {
  snackbar: {
    message: string;
    isOpen: boolean;
    severity: ISeverity | null;
  };
}

const initialState: uiState = {
  snackbar: {
    message: '',
    isOpen: false,
    severity: null,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSnackbarMessage: (
      state: uiState,
      { payload }: PayloadAction<{ message: string; severity: ISeverity }>
    ) => {
      state.snackbar = {
        message: payload.message,
        isOpen: true,
        severity: payload.severity,
      };
    },

    clearSnackbar: (state: uiState) => {
      state.snackbar = {
        message: '',
        isOpen: false,
        severity: null,
      };
    },
  },
});

export const { setSnackbarMessage, clearSnackbar } = uiSlice.actions;
