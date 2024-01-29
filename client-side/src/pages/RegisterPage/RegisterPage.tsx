/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { register } from '../../api/AuthService';
import google_logo from '../../assets/google_logo.png';
import './RegisterPage.css';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = async () => {
    const { jwt, success } = await register({ username, password });

    if (success) {
      localStorage.setItem('car-app-jwt', jwt);
      navigate('/home');
    } else {
      alert('Error registering');
    }
  };

  return (
    <div id="page">
      <form id="signin-form">
        <div className="title">Register</div>
        <button className="inputElement continueWithGoogle">
          <img src={google_logo} />
          Continue with Google
        </button>
        <div className="title gray">OR</div>
        <div className="stack">
          <input
            className="inputElement inputField"
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleUsernameChange(e)}
          />
          <input
            className="inputElement inputField"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e)}
          />
        </div>
        <button className="inputElement loginButton" onClick={() => handleRegisterClick()}>
          Create
        </button>
        <div className="centerXStack">
          <div className="body gray">Already have an account?</div>
          <Link to="/login">Login Here</Link>
          {/* <a className="body" href="#">
            {' '}
            Login Here
          </a> */}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
