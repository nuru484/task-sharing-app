import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const serverURL = import.meta.env.VITE_SERVER_URL;

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem('authToken');

    // Handle possible `null` for `token` safely
    const cleanedToken = token ? token.split('|')[1] : null;

    try {
      if (cleanedToken) {
        // Ensure `cleanedToken` is valid before using it
        await axios.post(
          `${serverURL}/api/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cleanedToken}`,
            },
          }
        );

        // Clear localStorage items on successful logout
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');

        // Redirect to the login page
        navigate('/');
      } else {
        console.warn('Token is missing or invalid.');
      }
    } catch (error: any) {
      // Use `any` type to suppress TypeScript issues
      console.error('Logout failed:', error);
    }
  };

  return logout;
};

export default useLogout;
