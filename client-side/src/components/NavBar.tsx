import { removeJwt } from '../api/JwtService';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    removeJwt();
    navigate('/login');
  };

  return (
    <div className="flex border-b-2 h-[50px] items-center space-x-4 justify-center">
      <h1>Home</h1>
      <button className="border-l-purple-200 float-right" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default NavBar;
