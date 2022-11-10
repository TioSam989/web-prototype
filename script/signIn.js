
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase"
import { redirectTo, alertCute, debouncedalertCute } from "./functions"
import { separeteClasses } from "./myElements/myNavBar"
import 'animate.css';

import 'animate.css';

onAuthStateChanged(auth, user => {
  if (user) {
    redirectTo("../index.html")
  }

});

submitDataSignIn.addEventListener('click', (e) => {

  var email = document.querySelector('#emailIn').value
  var password = document.querySelector('#passwordIn').value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      console.log(user)

      redirectTo("../index.html")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
    });


});

function validatorMeh(dataMeh, pattern) {

  if (dataMeh.match(pattern)) {
    return true
  } else {
    return false
  }

}

const emailInut = document.querySelector('#emailIn')
const spinEmail = document.querySelector('#emailSpin')
const checkedIcon = "fa-solid fa-check text-green-500"
const spinningIcon = "fa-solid fa-circle-notch text-primary"

const passWarn = document.querySelector('#passWarn')
const errorIcon = "fa-regular fa-circle-xmark"
const passInput = document.querySelector('#passwordIn')

const alertPlace = document.querySelector('#alerts')

const mehUE = document.querySelector('#mehmehmeh')

const backText = document.querySelector('#hiddenBack')
const backBtn = document.querySelector('#backMeh')

backBtn.addEventListener('mouseover', (e) => {
  backText.removeAttribute('hidden')
})

backBtn.addEventListener('mouseout', (e) => {
  backText.removeAttribute('hidden')
  backText.setAttribute('hidden','hidden')
})

emailInut.addEventListener('input', (e) => {
  spinEmail.classList.remove(...separeteClasses(checkedIcon).map(element => element))
  spinEmail.classList.remove(...separeteClasses(errorIcon).map(element => element))
  spinEmail.classList.remove('text-error')
  emailInut.classList.remove('input-error')
  emailInut.classList.remove('input-success')
  spinEmail.classList.add(...separeteClasses(spinningIcon).map(element => element))
  spinEmail.classList.add('spinnerMeh')
  spinEmail.classList.add('text-primary')
  emailInut.classList.add('input-primary')

  emailInut.addEventListener('blur', (e) => {

    if (emailInut.value != "") {
      emailInut.classList.remove('input-primary')

      if (validatorMeh(emailInut.value, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        spinEmail.classList.remove(...separeteClasses(spinningIcon).map(element => element))
        spinEmail.classList.remove('spinnerMeh')
        spinEmail.classList.remove('text-error')
        emailInut.classList.remove('input-error')
        spinEmail.classList.add(...separeteClasses(checkedIcon).map(element => element))
        emailInut.classList.add('input-success')

      } else {
        spinEmail.classList.remove(...separeteClasses(spinningIcon).map(element => element))
        spinEmail.classList.remove('spinnerMeh')
        emailInut.classList.remove('input-success')
        spinEmail.classList.add(...separeteClasses(errorIcon).map(element => element))
        spinEmail.classList.add('text-error')
        emailInut.classList.add('input-error')

      }
    } else {
      spinEmail.classList.remove(...separeteClasses(checkedIcon).map(element => element))
      spinEmail.classList.remove(...separeteClasses(spinningIcon).map(element => element))
      emailInut.classList.remove('input-success')
      emailInut.classList.remove('input-error')
      emailInut.classList.add('input-primary')

    }
  })

})

passInput.addEventListener('input', (e) => {


  passInput.classList.remove('input-error')
  passInput.classList.remove('input-success')
  passInput.classList.add('input-primary')

  passInput.addEventListener('blur', (e) => {
    if (passInput.value != "") {
      passInput.classList.remove('input-primary')

      if (validatorMeh(passInput.value, "(?=.*[0-9a-zA-Z]).{6,}")) {

        passInput.classList.remove('input-primary')
        passInput.classList.remove('input-error')
        passInput.classList.add('input-success')

      } else {
        passInput.classList.remove('input-success')
        passInput.classList.remove('input-primary')
        passInput.classList.add('input-error')
      }

    } else {
      passInput.classList.remove('text-error')
      passInput.classList.remove('input-error')
      passInput.classList.remove('input-success')
      passInput.classList.add('input-primary')
    }
  })

})

loginGitHub.addEventListener('click', (e) => {
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user)
      console.log(provider.providerId)

      redirectTo("../index.html")


      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);


      debouncedalertCute(mehUE, 'warning', 'Something went wrong!')
      console.log(errorMessage)
      // ...
    });

});

loginFacebook.addEventListener('click', (e) => {
  const provider = new FacebookAuthProvider();
  provider.addScope('user_birthday,email');


  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      redirectTo("../index.html")



      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      debouncedalertCute(mehUE, 'warning', 'Something went wrong!')
      console.log(errorMessage);


      // ...
    });

});

loginGoogle.addEventListener('click', (e) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      redirectTo("../index.html")

      console.log(user);
      // window.location = 'index.html';
      // console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      debouncedalertCute(mehUE, 'warning', 'Something went wrong!')
      console.log(error);
    });

});