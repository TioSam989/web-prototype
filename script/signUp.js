
import { onAuthStateChanged, createUserWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth, database } from "../firebase"
import { getDatabase, ref, set } from "firebase/database"
import { writeUserData, setLoading, alertCute, debouncedalertCute, redirectTo } from "./functions"
import { separeteClasses } from "./myElements/myNavBar"
import { validatorMeh, checkValue } from './functions';



import 'animate.css';

const emailInut = document.querySelector('#emailUp')
const spinEmail = document.querySelector('#emailSpin')
const checkedIcon = "fa-solid fa-check text-green-500"
const spinningIcon = "fa-solid fa-circle-notch text-primary"

const alertPlace = document.querySelector('#alerts')

const passWarn = document.querySelector('#passWarn')
const errorIcon = "fa-regular fa-circle-xmark"
const passInput = document.querySelector('#passwordUp')
const FName = document.querySelector('#name1')
const SName = document.querySelector('#name2')

const mehUE = document.querySelector('#mehmehmeh')

const backText = document.querySelector('#hiddenBack')
const backBtn = document.querySelector('#backMeh')

backBtn.addEventListener('mouseover', (e) => {
  backText.removeAttribute('hidden')
})

backBtn.addEventListener('mouseout', (e) => {
  backText.removeAttribute('hidden')
  backText.setAttribute('hidden', 'hidden')
})

FName.addEventListener('input', (e) => {
  
  FName.classList.remove('input-error')
  FName.classList.remove('input-success')
  FName.classList.add('input-primary')

  FName.addEventListener('blur', (e) => {
    if (FName.value != "") {
      FName.classList.remove('input-primary')

      if (checkValue(FName.value)) {

        FName.classList.remove('input-primary')
        FName.classList.remove('input-error')
        FName.classList.add('input-success')

      } else {
        FName.classList.remove('input-success')
        FName.classList.remove('input-primary')
        FName.classList.add('input-error')
      }

    } else {
      FName.classList.remove('text-error')
      FName.classList.remove('input-error')
      FName.classList.remove('input-success')
      FName.classList.add('input-primary')
    }
  })
  
})

SName.addEventListener('input', (e) => {


  SName.classList.remove('input-error')
  SName.classList.remove('input-success')
  SName.classList.add('input-primary')

  SName.addEventListener('blur', (e) => {
    if (SName.value != "") {
      SName.classList.remove('input-primary')

      if (checkValue(SName.value)) {

        SName.classList.remove('input-primary')
        SName.classList.remove('input-error')
        SName.classList.add('input-success')

      } else {
        SName.classList.remove('input-success')
        SName.classList.remove('input-primary')
        SName.classList.add('input-error')
      }

    } else {
      SName.classList.remove('text-error')
      SName.classList.remove('input-error')
      SName.classList.remove('input-success')
      SName.classList.add('input-primary')
    }
  })

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

submitDataSignUp.addEventListener('click', (e) => {

  const mehUE = document.querySelector('#mehmehmeh')


  var firstName = document.querySelector('#name1').value
  var lastName = document.querySelector('#name2').value

  var name = `${firstName} ${lastName}`
  var email = document.querySelector('#emailUp').value
  var password = document.querySelector('#passwordUp').value

  if (checkValue(firstName) && checkValue(lastName) && checkValue(email) && checkValue(password)) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        setLoading(true)

        var user = userCredential.user;

        try {
          if (!user.photoURL || user.photoURL == null || user.photoURL == undefined) {

            updateProfile(auth.currentUser, {
              photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
            }).then(() => {
            }).catch((error) => {
              console.error('something went wrong when tryin to change profile')
            });
          }

        } catch (error) {
          console.error(error)
        } finally {

          try {

            updateProfile(auth.currentUser, {
              displayName: `${name}`
            }).then(() => {
              signOut(auth).then(() => {
                redirectTo('./signIn.html')
              }).catch((error) => {
                // An error happened.
              });

            })

          } catch (error) {
            console.error(error.code)
          }

        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == 'auth/email-already-in-use') {
          debouncedalertCute(mehUE, 'info', 'email already in use')
        } else {
          debouncedalertCute(mehUE, 'waning', error.message)
        }

        // ..
      });
  } else {
    debouncedalertCute(mehUE, 'warning', 'please fill in all fields')
  }

});

loginGitHub.addEventListener('click', (e) => {
  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      signOut(auth).then(() => {
        redirectTo('./signIn.html')
      }).catch((error) => {
        console.error(error)
      });
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

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      signOut(auth).then(() => {
        redirectTo('./signIn.html')
      }).catch((error) => {
        console.error(error)
      });



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


      writeUserData(user.uid, user.email, user.displayName, "NONE", user.providerData )

      console.log(user)
      alert(user.uid)

      // window.location = 'index.html';
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error)
      // ...
      debouncedalertCute(mehUE, 'warning', 'Something went wrong!')
    });

});