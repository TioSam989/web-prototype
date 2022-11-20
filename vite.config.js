// vite.config.js
import { resolve } from 'path'
import { defineConfig, optimizeDeps } from 'vite'
import { Script } from 'vm'

export default defineConfig({
  build: {
    rollupOptions: {

        input: {
          mainMeh: resolve(__dirname, 'index.html'),
          musicResultMeh: resolve(__dirname, 'pages/musicResult.html'),
          musicSugMeh: resolve(__dirname, 'pages/musicSug.html'),
          signInMeh: resolve(__dirname, 'pages/signIn.html'),
          signUpMeh: resolve(__dirname, 'pages/signUp.html'),
          mainCSSMeh: resolve(__dirname, 'style/main.css'),
          inputCSSMeh: resolve(__dirname, 'style/input.css'),
          searchCSSMeh: resolve(__dirname, 'style/search.css'),
          apiMusicJsMeh: resolve(__dirname, 'script/apiMusic.js'),
          functionsJsMeh: resolve(__dirname, 'script/functions.js'),
          ScriptJsMeh: resolve(__dirname, 'script/Script.js'),
          SignInJsMeh: resolve(__dirname, 'script/SignIn.js'),
          SignUpJsMeh: resolve(__dirname, 'script/SignUp.js'),
          sptJsMeh: resolve(__dirname, 'script/spt.js'),
          sptRandomJsMeh: resolve(__dirname, 'script/sptRandom.js'),
          sptSearchJsMeh: resolve(__dirname, 'script/sptSearch.js'),
          sptSimilarJsMeh: resolve(__dirname, 'script/sptSimilar.js'),
          sptTokenJsMeh: resolve(__dirname, 'script/sptToken.js'),
          myCompMeh: resolve(__dirname, 'script/myComponents.js'),
          navCompMeh: resolve(__dirname, 'script/myElements/myNavBar.js'),
          themeChooserMeh: resolve(__dirname, 'script/myElements/themeChooser.js'),
          outputCSSMeh: resolve(__dirname, 'style/output.css'),
          profilePageMeh: resolve(__dirname, 'pages/profile.html'),
          audScrMeh: resolve(__dirname, './script/audScr.js'),
          mainScriptMeh: resolve(__dirname, './script/script.js'),
          artistImgMeh: resolve(__dirname, './img/artist.jpg'),
          designerImgMeh: resolve(__dirname, './img/designer.jpg'),
          developerImgMeh: resolve(__dirname, './img/developer.jpg'),
          profileImgMeh: resolve(__dirname, './img/profileForNow.jpg')
        }
    }

  }
})
