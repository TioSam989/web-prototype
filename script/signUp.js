
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from "../firebase"
import { writeUserData, setLoading, alertCute, debouncedalertCute, redirectTo } from "./functions"
import 'animate.css';


onAuthStateChanged(auth, user => {
  if (user) {
    redirectTo("../index.html")
  } else {
    console.log(user)
  }

});

submitDataSignUp.addEventListener('click', (e) => {

  const mehUE = document.querySelector('#mehmehmeh')


  var firstName = document.querySelector('#name1').value
  var lastName = document.querySelector('#name2').value

  var name = `${firstName} ${lastName}`
  var email = document.querySelector('#emailUp').value
  var password = document.querySelector('#passwordUp').value

  if (firstName || lastName || email || password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        setLoading(true)

        var user = userCredential.user;
        try {
          if (!user.photoURL) {
            auth.currentUser.updateProfile({
              photoURL: 'https://www.unigreet.com/wp-content/uploads/2021/01/smile-dp.jpg'
            })
          }
        } catch (error) {
          console.error(error)
        } finally {
          auth.currentUser.updateProfile({
            displayName: name

          }).then(() => {
            console.log('Username is: ' + auth.currentUser.displayName)
          }).catch((error) => {
            console.log('An error was occured while updating the profile.')
          })
        }






        updateProfile(auth.currentUser, {
          displayName: `${name}`
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });


        setLoading(false, 'User created')
        setTimeout(() => {
          redirectTo("../index.html")
        }, 1000);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)

        if (errorCode == 'auth/email-already-in-use') {
          debouncedalertCute(mehUE, 'success', 'email already in use')
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