// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { Script } from 'vm'

export default defineConfig({
  build: {
    rollupOptions: {

      input: {
        main: resolve(__dirname, 'index.html'),
        musicResult: resolve(__dirname, 'pages/musicResult.html'),
        musicSug: resolve(__dirname, 'pages/musicSug.html'),
        signIn: resolve(__dirname, 'pages/signIn.html'),
        signUp: resolve(__dirname, 'pages/signUp.html'),
        mainCSS: resolve(__dirname, 'style/main.css'),
        outputCSS: resolve(__dirname, 'style/output.css'),
        searchCSS: resolve(__dirname, 'style/search.css'),
        apiMusicJs: resolve(__dirname, 'script/apiMusic.js'),
        functionsJs: resolve(__dirname, 'script/functions.js'),
        ScriptJs: resolve(__dirname, 'script/Script.js'),
        SignInJs: resolve(__dirname, 'script/SignIn.js'),
        SignUpJs: resolve(__dirname, 'script/SignUp.js'),
        sptJs: resolve(__dirname, 'script/spt.js'),
        sptSearchJs: resolve(__dirname, 'script/sptSearch.js'),
        sptSimilarJs: resolve(__dirname, 'script/sptSimilar.js'),
        sptTokenJs: resolve(__dirname, 'script/sptToken.js')
      }
    }
  }
})
