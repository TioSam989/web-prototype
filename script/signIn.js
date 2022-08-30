
import {signInWithEmailAndPassword,  signInWithPopup,  GoogleAuthProvider, FacebookAuthProvider  , GithubAuthProvider , onAuthStateChanged  } from 'firebase/auth';
import {auth} from "../firebase"
import {redirectTo} from "./functions"

onAuthStateChanged(auth ,user => {
  console.clear()
    if(user){
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
  
        alert(errorMessage)
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
  
      alert(errorMessage);
  
  
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
      console.log(error);
    });
  
});