import { onAuthStateChanged, signOut, getAuth, sendEmailVerification  } from "firebase/auth"
import { auth } from "../firebase"
import {addBtnVerifyEmail, addBtnLogOut,appendAnchorTag} from "./functions"
import '../style/output.css';

function meh(){
  alert('meh')
}


onAuthStateChanged(auth, user => {
  if (user) {
    addBtnLogOut()
    console.log(`logged in ${user.displayName}`)
    console.log(user)
    document.querySelector("#App").innerHTML = `Hello ${user.displayName}`

    // <a href="./pages/signIn.html">sign In</a>
    // <a href="./pages/signUp.html">sign Up</a>

    if (!user.emailVerified) {
      addBtnVerifyEmail(user)
    }

  } else {

      appendAnchorTag('nav', 'a', './pages/signUp.html', 'sign up')
      appendAnchorTag('nav', 'a', './pages/signIn.html', 'sign in')
      console.log('Not logged');
      document.querySelector("#App").innerHTML = `Hello Guest`
      document.querySelector("#logOutApp").innerHTML = ""
      document.querySelector("#verif").innerHTML = ""
  }

});
