import { FormEvent, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useAppDispatch,
  startGoogleSignIn,
  useAppSelector,
  startLoginWithEmailAndPassword,
} from '../../store';
import { AuthLayout } from '../layout';

interface formData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>();

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onLoginUser = ({ email, password }: formData) => {
    dispatch(startLoginWithEmailAndPassword(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit(onLoginUser)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              placeholder="myemail@email.com"
              type="email"
              {...register('email', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Password"
              placeholder="Password"
              type="password"
              {...register('password', { required: true })}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {!!errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Don't have an account? </Typography>
            <Link component={RouterLink} to="/auth/register">
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
