import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"

const debouncedalertCute = debounce(alertCute, 2000)

function setLoading(cond = true, msg = 'Done') {
  console.log(cond)
  alert(cond)
  console.log(msg)
}

function checkifIndex() {
  const dawg = document.querySelector("#indexMeh");

  if (dawg) {
    return true;
  } else {
    false;
  }
}


function validatorMeh(dataMeh, pattern) {

  if (dataMeh.match(pattern)) {
    return true
  } else {
    return false
  }

}

function alertCute(placeMeh = null, alertType = 'warning', message = 'something went wrong') {

  if (!placeMeh) {
    placeMeh = document.querySelector('#mehmehmeh')
  }


  placeMeh.innerHTML = `<div class="alert alert-${alertType} shadow-lg"> <div> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> <span>${alertType}: ${message}!</span> </div> <div class="flex-none"></div> </div>`
  placeMeh.classList.add('animate__backInDown')

  setTimeout(() => {
    placeMeh.classList.add('animate__backOutDown')
    setTimeout(() => {
      placeMeh.setAttribute('hidden', 'hidden')
      placeMeh.classList.remove('animate__backInDown')
      placeMeh.classList.remove('animate__backOutDown')
      placeMeh.innerHTML = ''
      placeMeh.removeAttribute('hidden')
    }, 400)
  }, 5000);
}

function debounce(fn, delay = 1) {
  let previousTimeOut;
  return function (...params) {
    clearTimeout(previousTimeOut)

    previousTimeOut = setTimeout(() => {
      fn(...params)
    }, delay);
  }
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

function checkValue(valueMeh) {
  if (valueMeh) {
    let meh = valueMeh.replaceAll(/\s/g, '')
    if (meh && meh != "" && meh != null && meh != undefined) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function addBtnLogOut(ele = null) {
  if (!ele) {
    // document.querySelector("#logOutApp").innerHTML = '<a class="text-red-500" id="logOut" >Logout UIIUIUI (ICON)</a>'
    // logOut.addEventListener('click', (e) => {
    //   signOut(auth).then(() => {
    //     localStorage.removeItem('crrUser')
    //     console.log("Sign-out successful");
    //   }).catch((error) => {
    //     alert(errorMessage);
    //   });
    // });

    console.log('logout but any user here')
  } else {
    // ele.innerHTML += '<i class="fa-solid fa-right-from-bracket"></i>'
    ele.innerHTML += '<i class="fa-solid fa-person-through-window"></i>'
    ele.addEventListener('click', (e) => {
      signOut(auth).then(() => {
        localStorage.removeItem('crrUser')
        console.log("Sign-out successful");
        location.reload();

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

function getCrrTheme() {
  let elBroMeh = document.querySelector('HTML')
  let meh = elBroMeh.getAttribute('data-theme')
  return `${meh}`
}

function changeTheme(themeToPut) {
  let meh = document.querySelector('HTML')

  if (themeToPut == 'dark') {
    meh.removeAttribute('data-theme')
    meh.setAttribute('data-theme', 'dark')
  } else {
    meh.removeAttribute('data-theme')
    meh.setAttribute('data-theme', 'aqua')
  }

  storageItemControl('set', 'theme', getCrrTheme())

}

function pageMustHaveAll() {

  const damn = document.querySelector("#dontDoAllThatShitHere");

  if (!damn) {
    return true;
  } else {
    false;
  }
}

function buildSimpleMusicCard(image, name, band, song, place) {

  place.innerHTML += `<div class="card card-side bg-base-100 shadow-xl">
      <div class="avatar">
          <div class="w-32 rounded">
              <img src="${image}" />
          </div>
      </div>
      <div class="card-body">
          <h2 id="namePlace" class="card-title">${name}</h2>
          <p id="bandPlace">${band}</p>
          <div class="card-actions justify-end">
              <button class="btn btn-primary"><i class="fa-solid fa-play"></i></button>
          </div>
      </div>
  </div>`
  return true
}

function storageItemControl(action, itemName, valueItem) {

  if (action == 'set') {
    if (localStorage.getItem(itemName)) {
      localStorage.removeItem(itemName)
      localStorage.setItem(itemName, valueItem)
    } else {
      localStorage.setItem(itemName, valueItem)
    }
  }
}

export { getCrrTheme, buildSimpleMusicCard, changeTheme, storageItemControl, pageMustHaveAll, checkifIndex, setLoading, checkValue, validatorMeh, debouncedalertCute, addBtnLogOut, appendAnchorTag, writeUserData, redirectTo, alertCute }