import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(),VitePWA({})],
  build: {
    outDir: 'docs'
  },
  // base: '/Pokemaniac',
  root: '.',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@data': path.resolve(__dirname, './src/data'),
      '@dataConstructors': path.resolve(__dirname, './src/dataConstructors'),
      '@hooksAndUtils': path.resolve(__dirname, './src/hooksAndUtils'),
      '@root': path.resolve(__dirname, './src')
    }
  }
})
