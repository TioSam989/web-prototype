
import {onAuthStateChanged , createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase"
import {writeUserData} from "./functions"

onAuthStateChanged(auth ,user => {
  if(user){
    redirectTo("../index.html")
  }else{
   console.log(user) 
  }

});

submitDataSignUp.addEventListener('click', (e) =>{

    var email = document.querySelector('#email').value
    var password = document.querySelector('#password').value
    var username = document.querySelector('#username').value
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        var user = userCredential.user;
        
        user.email = email
        user.displayName = username
    
        redirectTo("../index.html")

        console.log(user)
    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    
        alert(errorMessage)
        
        // ..
      });
  
});