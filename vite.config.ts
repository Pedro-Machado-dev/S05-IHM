import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" precisa ser o nome do repositório no GitHub (https://usuario.github.io/S05-IHM/)
export default defineConfig({
  base: '/S05-IHM/',
  plugins: [react()],
});
