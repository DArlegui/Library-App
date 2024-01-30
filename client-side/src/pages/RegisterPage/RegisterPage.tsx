/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/AuthService';
import Form from '../../components/Form';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const { jwt, success } = await register({ username, password });

    if (success) {
      localStorage.setItem('car-app-jwt', jwt);
      navigate('/home');
    } else {
      alert('Name already taken');
    }
  };

  return (
    <div id="page">
      <Form
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPassword={handleConfirmPassword}
        handleLoginClick={handleRegisterClick}
        error=""
        title="Register"
        isRegister={true}
        linkURL="/login"
      />
    </div>
  );
};

export default RegisterPage;
