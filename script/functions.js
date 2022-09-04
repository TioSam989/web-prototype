import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"


function addBtnVerifyEmail(user) { //i've to take it off from here
  document.querySelector("#verif").innerHTML += '<button id="verifyEmail" style="background-color:green; color:white">Verify Email</button>'
  verif.addEventListener('click', (e) => {

    if (user.email != "") {

      console.log(user.email)
      linkMe(user.email)

    } else {

      let email = prompt("Please enter your email:", "example@email.com");
      if (email == null || email == "") {
        alert(`c'mon, give us ur mail ${user.displayName}`)
        console.log(`he canceled my PopUp`)
      } else {
        console.log(email)
        user.email = email
        console.log(user)
        linkMe(email)
      }
    }
  });
}

function linkMe(hisEmail) {
  const auth = getAuth()
  console.log(hisEmail)
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log(`Email verification sent to ${hisEmail}!`)
      checkIfEmailHasBeenVerified()
      // ...
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

function writeUserData(userId, email, username, password, providerName) { //i'm not using but im gonna use "Tomorrow"
  const database = getDatabase();
  set(ref(database, 'users/' + userId), {
    email: email,
    username: username,
    password: password,
    provider: providerName

  })
    .then(() => {
      console.log('Data saved successfully!')
    })
    .catch((error) => {
      console.log('The write failed...')
    });

}

function redirectTo(where) {
  window.location = `${where}`
}

export { addBtnVerifyEmail, addBtnLogOut, appendAnchorTag, writeUserData, redirectTo }