import { useMemo, useEffect, useRef, ChangeEvent } from 'react';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { ImageGallery } from '../components';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';
import { INote } from '../../interfaces';
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal';

export const NoteView = () => {
  const dispatch = useAppDispatch();
  const { activeNote, isSaving } = useAppSelector((state) => state.journal);

  const { register, reset, formState, getValues } = useForm<INote>({
    reValidateMode: 'onChange',
    defaultValues: useMemo(() => activeNote!, [activeNote]),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dateString = useMemo(() => {
    const newDate = new Date(activeNote!.date);
    return newDate.toUTCString();
  }, [activeNote?.date]);

  useEffect(() => {
    reset(activeNote!);
  }, [activeNote]);

  const onClickSave = () => {
    dispatch(startSaveNote(getValues()));
  };

  const onInputFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files === null) return;

    dispatch(startUploadingFiles(target.files));
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <input
        multiple
        onChange={onInputFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />

      <IconButton
        color="primary"
        disabled={isSaving}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadOutlined />
      </IconButton>

      <Grid item>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onClickSave}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          fullWidth
          label="Title"
          placeholder="Title..."
          sx={{ mb: 1, border: 'none' }}
          type="text"
          variant="filled"
          {...register('title', { required: 'This field is required' })}
        />
        <TextField
          fullWidth
          minRows={5}
          multiline
          placeholder="Write your journal entry here..."
          type="text"
          variant="filled"
          {...register('body', { required: 'This field is required' })}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDeleteNote} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      <ImageGallery images={activeNote?.imagesUrls || []} />
    </Grid>
  );
};
