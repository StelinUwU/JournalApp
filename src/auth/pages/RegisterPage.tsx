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
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../layout';
import { validations } from '../../utils/';
import { useAppDispatch, useAppSelector } from '../../store';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks';

interface formData {
  displayName: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>({ mode: 'onBlur' });

  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const onSubmit = ({ displayName, password, email }: formData) => {
    dispatch(
      startCreatingUserWithEmailAndPassword(email, password, displayName)
    );
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Full Name"
              type="text"
              {...register('displayName', {
                required: 'This field is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              placeholder="myemail@email.com"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'This field is required',
                validate: validations.isValidEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Password"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {!!errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuth}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> Already have an account?</Typography>
            <Link component={RouterLink} to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
