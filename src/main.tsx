import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RouterConfig from './routes';

// Ensure `useAuth` is imported in RouterConfig
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>
);
