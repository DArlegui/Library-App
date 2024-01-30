/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from '../../api/AuthService';
import Form from '../../components/Form';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    const { jwt, success } = await LogIn({ username, password });

    if (success) {
      localStorage.setItem('book-app-jwt', jwt);
      navigate('/home');
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div id="page">
      <Form
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPassword={() => {}}
        handleLoginClick={handleLoginClick}
        error={error}
        title="Login"
        isRegister={false}
        linkURL="/"
      />
    </div>
  );
};

export default LoginPage;
