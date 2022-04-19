import { useContext, useEffect, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../api/use-axios';
import ApiConfig from '../../api/api-config';
import { AuthContext } from '../../context/AuthContext';

const LOGIN_AXIOS_CONFIG = ApiConfig.AUTH.LOGIN;

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { fetch, response, error } = useAxios(LOGIN_AXIOS_CONFIG, false);

  useEffect(() => {
    if (error) {
      setLoginError(error.response.data.error.message);
    }
    if (response) {
      dispatch({ type: 'LOGIN', payload: response });
      navigate('/');
    }
  }, [response, error, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    LOGIN_AXIOS_CONFIG.data = {
      phone,
      password,
    };
    fetch();
  };

  return (
    <div className="login">
      <div className="logo">
        <h1>NITTI</h1>
        <h3>National Information Technology Training Institute</h3>
      </div>
      <form onSubmit={handleLogin}>
        <input type="number" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
        {loginError && <span>{loginError}</span>}
      </form>
    </div>
  );
};

export default Login;
