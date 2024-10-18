import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true, // ホストを公開
    port: 5173, // ポート番号を指定
  },
  build: {
    outDir: 'build',
  },
});
