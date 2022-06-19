import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout';
import { NoteView, NothingSelectedView } from '../views';
import { useAppDispatch, useAppSelector } from '../../store';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  const dispatch = useAppDispatch();

  const { isSaving, activeNote } = useAppSelector((state) => state.journal);

  const onNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {!!activeNote ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        disabled={isSaving}
        onClick={onNewNote}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
