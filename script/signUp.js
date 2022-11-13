
import { onAuthStateChanged, createUserWithEmailAndPassword, signOut,  updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from "../firebase"
import { writeUserData, setLoading, alertCute, debouncedalertCute, redirectTo } from "./functions"

import 'animate.css';

submitDataSignUp.addEventListener('click', (e) => {

  const mehUE = document.querySelector('#mehmehmeh')


  var firstName = document.querySelector('#name1').value
  var lastName = document.querySelector('#name2').value

  var name = `${firstName} ${lastName}`
  var email = document.querySelector('#emailUp').value
  var password = document.querySelector('#passwordUp').value

  if (firstName && lastName && email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        setLoading(true)

        var user = userCredential.user;

        try {
          if (!user.photoURL || user.photoURL == null || user.photoURL == undefined) {
            console.log(user)

            updateProfile(auth.currentUser, {
              photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
            }).then(() => {
              console.log('User photo Updated')
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
              console.log('user name updated')
              signOut(auth).then(() => {
                redirectTo('../index.html')
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
        console.log(errorCode)

        if (errorCode == 'auth/email-already-in-use') {
          debouncedalertCute(mehUE, 'info', 'email already in use')
        }else{
          debouncedalertCute(mehUE, 'waning', error.message)
        }

        // ..
      });
  } else {
    console.log(!firstName || !lastName || !email || !password)
    debouncedalertCute(mehUE, 'success', 'please fill in all fields')
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