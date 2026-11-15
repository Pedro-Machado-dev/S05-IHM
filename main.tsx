import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/arimo/400.css';
import '@fontsource/arimo/700.css';
import './styles.css';
import App from './App';
import { AppProvider } from './context/AppContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);

// PWA: registra o service worker só na versão publicada
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // sem service worker o app continua funcionando normalmente
    });
  });
}
