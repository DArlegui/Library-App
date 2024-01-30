import google_logo from '../assets/google_logo.png';
import { Link } from 'react-router-dom';

interface Props {
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginClick: () => void;
  error: string;
  title: string;
  isRegister: boolean;
  linkURL: string;
}

const Form: React.FC<Props> = ({
  handleUsernameChange,
  handlePasswordChange,
  handleConfirmPassword,
  handleLoginClick,
  error,
  title,
  isRegister,
  linkURL,
}) => {
  return (
    <form id="signin-form">
      <div className="title">{title}</div>
      <button className="inputElement continueWithGoogle">
        <img src={google_logo} />
        {title} with Google
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
        {isRegister && (
          <input
            className="inputElement inputField"
            type="password"
            name="password"
            placeholder="Confirm Password"
            onChange={(e) => handleConfirmPassword(e)}
          />
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <button type="button" className="inputElement loginButton" onClick={() => handleLoginClick()}>
        {isRegister ? 'Create Account' : 'Login'}
      </button>
      <div className="centerXStack">
        <div className="body gray">{isRegister ? 'Have an account?' : 'No account?'}</div>
        <Link to={`${linkURL}`} className="body">
          {isRegister ? 'Login Here' : 'Register Here'}
        </Link>
      </div>
    </form>
  );
};

export default Form;
