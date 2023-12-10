import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import LoginImg from '../../assets/images/Login.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_ACTIVE_USER,
  selectUserId,
  selectUserToken,
} from '../../redux/slice/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import { fetchDataAxios } from '../../api/customAxios';
import { STORE_ITEMS_TO_CART } from '../../redux/slice/cartSlice';
const login = async (email, password) => {};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserId);

  const redirectUser = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      });
      const r = response.data;
      dispatch(
        SET_ACTIVE_USER({
          email: r.userInfo.email,
          fullName: r.userInfo.fullName,
          id: r.userInfo.id,
          roleName: r.userInfo.roleName,
          token: r.token,
          avatarUrl: r.userInfo.avatarUrl,
          address: r.userInfo.address ? r.userInfo.address.split(', ') : [],
          phoneNumber: r.userInfo.phoneNumber,
        })
      );
      const cartItems = await fetchDataAxios({
        url: `carts/${r.userInfo.id}`,
        token: r.token,
      });
      dispatch(STORE_ITEMS_TO_CART({ cartItems: cartItems.options }));

      toast.success('Login Successful');
      setTimeout(function () {
        redirectUser();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container component='main' maxWidth='lg'>
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container direction='row' justifyContent='center'>
          <Grid
            item
            xs={false}
            sm={6}
            md={5}
            sx={{
              backgroundImage: `url(${LoginImg})`,
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
                Log In
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container justifyContent={'end'}>
                  {/* <Grid item xs>
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link href='#' variant='body2'>
                      {'Register'}
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
export default Login;
