const serverURL = import.meta.env.VITE_SERVER_URL;

export const signup = async (
  name: string,
  username: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const response = await fetch(`${serverURL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        password_confirmation,
      }),
    });

    // If the response status is not OK (not 2xx), throw an error
    if (!response.ok) {
      console.log(response);
      throw new Error('Signup failed, please check your information.');
    }

    const data = await response.json();

    // Check if the response status is success
    if (data.status === 'success') {
      return {
        user: data.data.user,
        token: data.data.token,
      };
    } else {
      throw new Error(data.message || 'An error occurred during signup.');
    }
  } catch (error) {
    // Log the error to help with debugging
    console.error(error);
    throw new Error(error.message || 'An error occurred while signing up.');
  }
};
