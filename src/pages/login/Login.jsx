import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Avatar, Container } from '@mui/material';
import ControlledTextInput from 'src/components/mui-react-hook-form/ControlledTextInput';
import { Box } from '@mui/system';
import { LockOutlined } from '@mui/icons-material';
import ApiConfig from '../../api/api-config';
import { AuthContext } from '../../context/AuthContext';
import axiosHook from '../../api/axios-hook';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://nitti.in/">
        NITTI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const schema = yup.object({
  phone: yup
    .string()
    .matches(/^[6-9]{1}[0-9]{9}$/, 'Invalid phone number!')
    .required('Field is required!'),
  password: yup.string().min(8).max(20).required(),
});

const Login = () => {
  const alert = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [, doLogin] = axiosHook(
    {
      ...ApiConfig.AUTH.LOGIN,
    },
    { manual: true }
  );

  const handleLogin = () => {
    handleSubmit(async (data) => {
      try {
        const response = await doLogin({
          data,
        });
        dispatch({ type: 'LOGIN', payload: response.data });
        navigate('/dashboard');
        alert.success('Logged in!');
      } catch (error) {
        console.log(error);
        alert.error(error.response.data.message);
      }
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(handleLogin)}>
          <ControlledTextInput name={'phone'} control={control} label="Phone" variant="outlined" margin="normal" />
          <ControlledTextInput
            name={'password'}
            control={control}
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Boolean(Object.keys(errors).length)}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
