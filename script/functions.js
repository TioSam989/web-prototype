import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth, database } from "../firebase"
import { getDatabase, ref, child, push, update, set, onValue } from "firebase/database";

const debouncedalertCute = debounce(alertCute, 2000)

function setLoading(cond = true, msg = 'Done') {
  console.log(cond)
  alert(cond)
  console.log(msg)
}

function gimmeDatePls(timestampedDate) {

  const date = new Date(+timestampedDate)
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()

  return dateFormat

}

function writeData(userId, valueMeh, timestempTime) {
  var time = timestempTime
  var dataValue = valueMeh;
  var dataRef = push(ref(database, '/users/' + userId + '/history/'))

  onValue((ref(database, '/users/' + userId + '/history/')), (snapshot) => {
    var listSameSong = []
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();

      if (childData.trackId == valueMeh) {
        listSameSong.push(valueMeh)
      }
    })

    if (listSameSong.length === 0) {
      set(dataRef, {
        trackId: dataValue,
        at: time
      })
    }
  });
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

function getUrlVar(whichOne) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  let elementChose = urlParams.get(whichOne)

  return elementChose

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


function writeUserData(userId) {
  set(ref(database, 'users/' + userId), {
    id: userId,
  })
    .then(() => {
      console.log('data saved successfully')
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
    meh.setAttribute('data-theme', 'dark')
  }

  storageItemControl('set', 'theme', getCrrTheme())

}

function convertMsToMin(msValue) {
  var ms = +msValue,
    min = Math.floor((ms / 1000 / 60) << 0),
    sec = Math.floor((ms / 1000) % 60);

  return min + ':' + sec
}

function pageMustHaveAll() {

  const damn = document.querySelector("#dontDoAllThatShitHere");

  if (!damn) {
    return true;
  } else {
    false;
  }
}

function buildFinalMusicCard(name, band, img, trackId, sptLink, ytLink, sldcLink, song, place) {

  

  place.innerHTML += `<div class=" animate__animated animate__fadeInDown card card-side bg-base-100 shadow-xl ">
  <div class="avatar">
      <div class="w-32 rounded">
          <img src="${img}" />
      </div>
  </div>
  <div class="card-body">
      <h2 id="namePlace" class="card-title">${name}</h2>
      <p id="bandPlace">${band}</p>

      <div class="flex flex-cow justify-between">

          <div class="card-actions mt-2">

              <a id="" href="${sptLink}" target="_blank">
                  <button class="btn btn-circle bg-green-500 text-accent-content "><i
                          class="fa-brands fa-spotify"></i></button>
              </a>
              <a id="" href="${ytLink}" target="_blank">
                  <button class="btn btn-circle bg-red-500 text-accent-content "><i
                          class="fa-brands fa-youtube"></i></button>
              </a>
              <a id="" href="${sldcLink}" target="_blank">
                  <button class="btn btn-circle bg-orange-500 text-accent-content "><i
                          class="fa-brands fa-soundcloud"></i></button>
              </a>

          </div>
          <div class="">

              <button id="musicBtn" class="btn btn-primary playSong"><i
                      class="fa-solid fa-play"></i>
                  <audio id="myAudio-${trackId}">
                      <source
                          src="${song}"
                          type="audio/mpeg">
                  </audio>
              </button>
          </div>
      </div>
  </div>

</div>`

if(!song){
  let son = place.querySelector(`#myAudio-${trackId}`)
  let dad = son.parentNode

  dad.setAttribute('disabled','disabled')
  dad.setAttribute('title', 'song not available')
}

}

function buildSimpleMusicCard(image, name, band, song, place, trackId, artistId, explicit = false) {



  place.innerHTML += `<div class=" animate__animated animate__fadeInDown card card-side bg-base-100 shadow-xl hover:border-secondary hover:border-l-8">
      <div class="avatar">
          <div class="w-32 rounded">
              <img src="${image}" />
          </div>
      </div>
      <div class="card-body">
          <h2 id="namePlace" class="card-title">${name}</h2>
          <p id="bandPlace">${band}</p>
          <div class="card-actions justify-end">
          <a id="${trackId}-btn" href="./musicSug.html?track=${trackId}&artist=${artistId}"><button class="btn btn-secondary">Get similar songs <i class="fa-solid fa-music pl-4"></i> </button></a>
          <button id="play-${trackId}" class="btn btn-primary playSong"><i class="fa-solid fa-play"></i>
            <audio id="audio-${trackId}">
              <source id="${trackId}" src="${song}" type="audio/mpeg">
            </audio>
          </button>

          </div>
      </div>
  </div>`


  return true
}

function addEvent(ele) {
  ele.addEventListener('click', () => {
    console.log('event added')
    playMySng(ele)
  })
}

function playMySng(el) {
  let btn = el
  const icon = el.querySelector('i')
  let myAudio = el.querySelector('audio')

  if (myAudio.paused) {
    myAudio.play()
    icon.classList.remove('fa-play')
    icon.classList.add('fa-pause')

    setInterval(function () {

      if (myAudio.paused) {
        icon.classList.remove('fa-pause')
        icon.classList.add('fa-play')
      }
    }, 1000);


  } else {
    myAudio.pause()
    icon.classList.remove('fa-pause')
    icon.classList.add('fa-play')
  }


}


function prepareString(someString) {
  return someString.toString().replace(/\s/g, '+');
}

function addMusicControl() {
  let x = document.querySelector('#myAudio')
  let musicBtn = document.querySelector('#musicBtn')

  musicBtn.addEventListener('click', () => {

    console.log(musicBtn.querySelector('#myAudio'))
  })
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

export { getCrrTheme, getUrlVar, gimmeDatePls, writeData, buildFinalMusicCard, addEvent, playMySng, convertMsToMin, prepareString, addMusicControl, buildSimpleMusicCard, changeTheme, storageItemControl, pageMustHaveAll, checkifIndex, setLoading, checkValue, validatorMeh, debouncedalertCute, addBtnLogOut, appendAnchorTag, writeUserData, redirectTo, alertCute }