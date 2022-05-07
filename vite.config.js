import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    outDir: 'docs'
  }, 
  base: '/Pokemaniac/docs/',
  root: '.',
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@dataConstructors": path.resolve(__dirname, "./src/dataConstructors"),
      "@hooksAndUtils": path.resolve(__dirname, "./src/hooksAndUtils"),
      "@root": path.resolve(__dirname, "./src"),
    }
  }
})
