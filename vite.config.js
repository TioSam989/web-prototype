// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signIn: resolve(__dirname,'pages/signIn.html'),
        signUp: resolve(__dirname,'pages/signUp.html'),
        music: resolve(__dirname, 'pages/musicResult.html')
      }
    }
  }
})
