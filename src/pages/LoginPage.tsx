import React, { useState, useEffect } from 'react';
import LoginForm from '../components/login';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (user: any, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));

    setUser(user);
    setToken(token);
  };

  if (user && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
