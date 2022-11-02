import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"

function alertCute(placeMeh=null, alertType = 'warning', message = 'something went wrong') {
  if(!placeMeh){
    placeMeh = docuemnt.querySelector('#mehmehmeh')
  }

  let closeMeh = document.querySelector('#btnCloseAlert')
  
  placeMeh.innerHTML = `<div class="alert alert-${alertType} shadow-lg"> <div> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> <span>${alertType}: ${message}!</span> </div> <div class="flex-none"><button id="btnCloseAlert" class="btn btn-sm btn-primary"><i class="fa-solid fa-xmark"></i></button></div> </div>`
  placeMeh.classList.add('animate__backInDown')
  setTimeout(() => {
    placeMeh.classList.add('animate__backOutDown')
    setTimeout(() => {
      placeMeh.setAttribute('hidden', 'hidden')
    }, 400)
  }, 5000);
}

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

function addBtnLogOut(ele = null) {
  if (!ele) {
    document.querySelector("#logOutApp").innerHTML = '<a class="text-red-500" id="logOut" >Logout UIIUIUI (ICON)</a>'
    logOut.addEventListener('click', (e) => {
      signOut(auth).then(() => {
        localStorage.removeItem('crrUser')
        console.log("Sign-out successful");
      }).catch((error) => {
        alert(errorMessage);
      });
    });
  } else {
    // ele.innerHTML += '<i class="fa-solid fa-right-from-bracket"></i>'
    ele.innerHTML += '<i class="fa-solid fa-person-through-window"></i>'
    ele.addEventListener('click', (e) => {
      signOut(auth).then(() => {
        localStorage.removeItem('crrUser')
        console.log("Sign-out successful");
      }).catch((error) => {
        alert(errorMessage);
      });
    })
  }
}

const appendAnchorTag = (whereToPlace, whichElement, reference, text) => {

  const list = document.getElementById(`${whereToPlace}`);
  const anchor = document.createElement(`${whichElement}`);
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

export { addBtnVerifyEmail, addBtnLogOut, appendAnchorTag, writeUserData, redirectTo, alertCute }