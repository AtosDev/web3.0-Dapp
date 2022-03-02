import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})


//initializing react app by vite will create this file.
//npm init vite@latest
//choose react framework with js variant
//npm run dev to start the server.