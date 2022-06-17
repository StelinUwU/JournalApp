import { Button, Grid, TextField, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components';

export const NoteView = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          17 July 2020
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
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
        />
        <TextField
          fullWidth
          minRows={5}
          multiline
          placeholder="Write your journal entry here..."
          type="text"
          variant="filled"
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
