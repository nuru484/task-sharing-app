import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const serverURL = import.meta.env.VITE_SERVER_URL;

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem('authToken');
    const cleanedToken = token.split('|')[1];

    try {
      if (token) {
        await axios.post(
          `${serverURL}/api/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cleanedToken}`,
            },
          }
        );

        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');

        // Redirect to the login page
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
};

export default useLogout;
