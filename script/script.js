import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"

function addBtnVerifyEmail(user) { //i've to take it off from here
  document.querySelector("#verif").innerHTML += '<button id="verifyEmail" style="background-color:green; color:white">Verify Email</button>'
  verif.addEventListener('click', (e) => {

    if (user.email != "") {

      console.log(user.email)


    } else {

      let email = prompt("Please enter your email:", "example@email.com");
      if (email == null || email == "") {
        alert(`c'mon, give us ur mail ${user.displayName}`)
        console.log(`he canceled my PopUp`)
      } else {
        console.log(email)
      }
    }
  });
}


function addBtnLogOut() {
  document.querySelector("#logOutApp").innerHTML += '<button id="logOut" style="background-color:red; color:white">LogOut</button>'
  logOut.addEventListener('click', (e) => {
    signOut(auth).then(() => {
      console.log("Sign-out successful");
    }).catch((error) => {
      alert(errorMessage);
    });
  });
}

const appendAnchorTag = (whereToPlace, whichElement, reference, text) => {

  const anchor = document.createElement(`${whichElement}`);
  const list = document.getElementById(`${whereToPlace}`);
  const meh = document.createElement(`${whichElement}`);

  anchor.href = `${reference}`;
  anchor.innerText = `${text}`;
  meh.appendChild(anchor);
  list.appendChild(meh);
};

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};


onAuthStateChanged(auth, user => {
  if (user) {
    addBtnLogOut();
    console.log(`logged in ${user.displayName}`)
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