import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { persistStatePlugin } from './vite-plugin-persist-state';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), persistStatePlugin()],
});
