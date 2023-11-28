import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SignUpImg from '../../assets/images/SignUp.jpg';
import { Container } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const API_URL = process.env.REACT_APP_API_URL; // Đảm bảo bạn đã định nghĩa REACT_APP_API_URL trong file .env

    const data = new FormData(event.currentTarget);
    const formData = {
      fullName: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      toast.success('Register successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Register failed');
    }
  };

  return (
    <Container component='main' maxWidth='lg'>
      <Box
        sx={{
          marginTop: 4,
        }}
      >
        <Grid
          container
          component='main'
          direction='row'
          justifyContent='center'
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={6}
            md={5}
            sx={{
              backgroundImage: `url(${SignUpImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component='h1' variant='h5' fontWeight={'bold'}>
                Register
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete='given-name'
                      name='fullName'
                      required
                      fullWidth
                      id='fullName'
                      label='Full Name'
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='new-password'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='confirmPassword'
                      label='Confirm Password'
                      type='password'
                      id='confirmPassword'
                      autoComplete='confirm-password'
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link href='#' variant='body2'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Register;
