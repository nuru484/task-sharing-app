// src/api/auth.ts
const serverURL = import.meta.env.VITE_SERVER_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${serverURL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // If the response status is not OK (not 2xx), throw an error
    if (!response.ok) {
      throw new Error('Login failed, please check your credentials.');
    }

    const data = await response.json();

    // Check if the response status is success
    if (data.status === 'success') {
      return {
        user: data.data.user,
        token: data.data.token,
      };
    } else {
      throw new Error(data.message || 'An error occurred during login.');
    }
  } catch (error: any) {
    // Explicitly typing error as any
    // Log the error to help with debugging
    console.error(error);
    throw new Error(error.message || 'An error occurred while logging in.');
  }
};
