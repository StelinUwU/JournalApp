import { Grid, Typography } from '@mui/material';
import { StarOutline } from '@mui/icons-material';

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: 'calc(100vh - 120px)',
        backgroundColor: 'primary.main',
        borderRadius: 3,
      }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="white">
          No journal entry selected.
        </Typography>
      </Grid>
    </Grid>
  );
};
