import { onAuthStateChanged, signOut, getAuth, sendEmailVerification  } from "firebase/auth"
import { auth } from "../firebase"
import {addBtnVerifyEmail, addBtnLogOut,appendAnchorTag} from "./functions"
import '../style/output.css';

onAuthStateChanged(auth, user => {
  if (user) {

    let nav = document.querySelector('#navbar')
    let son = nav.firstElementChild
    let logOutBtn = son.shadowRoot.querySelector("#LogOutBtn")
    console.log(logOutBtn)

    
    addBtnLogOut(logOutBtn)
    console.log(`logged in ${user.displayName}`)
    console.log(user)
    document.querySelector("#App").innerHTML = `Hello ${user.displayName}`

    // <a href="./pages/signIn.html">sign In</a>
    // <a href="./pages/signUp.html">sign Up</a>

    if (!user.emailVerified) {
      addBtnVerifyEmail(user)
    }

  } else {

      appendAnchorTag('appLog', 'a', './pages/signUp.html', 'sign up')
      appendAnchorTag('appLog', 'a', './pages/signIn.html', 'sign in')
      console.log('Not logged');
      document.querySelector("#App").innerHTML = `Hello Guest`
      document.querySelector("#logOutApp").innerHTML = ""
      document.querySelector("#verif").innerHTML = ""
  }

});


