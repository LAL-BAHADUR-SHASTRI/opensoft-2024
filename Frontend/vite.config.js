import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  server:{
    host:true,
    port:5173,
  },
  preview: {
    host: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
