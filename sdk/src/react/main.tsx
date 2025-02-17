import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import { App } from './App';
import { VideoPicker } from '../lib';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoPicker baseURL="http://localhost:3000" />
  </StrictMode>
);
