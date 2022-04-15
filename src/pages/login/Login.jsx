import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({ type: 'LOGIN', payload: user })
        navigate("/")
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        setLoginError(errorMessage);
      });
  }
  return <div className="login">
    <div className="logo">
      <h1>NITTI</h1>
      <h3>National Information Technology Training Institute</h3>
    </div>
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Submit</button>
      {loginError && <span>{loginError}</span>}
    </form>
  </div>;
};

export default Login;
