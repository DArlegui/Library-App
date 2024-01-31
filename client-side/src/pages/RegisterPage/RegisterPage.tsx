/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/AuthService';
import Form from '../../components/Form';

const RegisterPage = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handlefirstNameChange = (e: any) => {
  //   setFirstName(e.target.value);
  // }

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
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
    <div className="w-full h-screen bg-background flex justify-center items-center">
      <Form
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPassword={handleConfirmPassword}
        handleLoginClick={handleRegisterClick}
        error={error}
        title="Register"
        isRegister={true}
        linkURL="/login"
      />
    </div>
  );
};

export default RegisterPage;
