import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearSnackbar } from '../../store/ui';

export const SnackBarAlert = () => {
  const dispatch = useAppDispatch();
  const { isOpen, severity, message } = useAppSelector(
    (state) => state.ui.snackbar
  );

  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <>
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
