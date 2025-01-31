import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Upload } from './Upload';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Upload />
  </StrictMode>
);
