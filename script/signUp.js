
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../firebase"
import { writeUserData, setLoading, alertCute, debouncedalertCute } from "./functions"
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
  
  if(firstName || lastName || email || password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      setLoading(true)

      var user = userCredential.user;

      auth.currentUser.updateProfile({
        displayName: name
      }).then(() => {
        console.log('Username is: ' + auth.currentUser.displayName)
      }).catch((error) => {
        console.log('An error was occured while updating the profile.')
      })

      setLoading(false, 'User created')
      setTimeout(() => {
        redirectTo("../index.html")
      }, 1000);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      
      if(errorCode == 'auth/email-already-in-use'){
        debouncedalertCute(mehUE, 'success', 'email already in use')
      }

      // ..
    });
  }else{
    console.log(!firstName || !lastName || !email || !password)
    debouncedalertCute(mehUE, 'success', 'please fill in all fields')
  }

});