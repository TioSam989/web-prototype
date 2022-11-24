import { onAuthStateChanged, signOut, deleteUser, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"
import { addBtnLogOut, checkifIndex, getCrrTheme, buildFinalMusicCard, changeTheme, pageMustHaveAll, redirectTo, storageItemControl, convertMsToMin, prepareString, addEvent } from "./functions"
import '../style/output.css';
import 'animate.css';
import { getSptApiTrack, getSptApiSimilarResults, getSptApiRandomResults } from './spt'
import { getDatabase, ref, set, push } from "firebase/database";
import { artists } from './sptSearch'
import styled from "daisyui/dist/styled";

const placeImg = document.querySelector('#imgPlace')
const delay = ms => new Promise(res => setTimeout(res, ms));

function checkIfLastPage() {
  if (document.querySelector('#musicSug')) {
    lastPageFunc()
  }
}

function buildCrrMusicPlaceMeh(music) {
  const namePlace = document.querySelector('#crrMusicName')
  const artistPlace = document.querySelector('#crrMusicArtist')
  const imagePlace = document.querySelector('#crrMusicImg')
  const popularityPlace = document.querySelector('#crrSongPopularity')
  const durationPlace = document.querySelector('#crrMusicDuration')
  const realiseDatePlace = document.querySelector('#crrMusicRealiseDate')
  const explicitedPlace = document.querySelector('#crrSongExplicited')
  const spotifyLinkPlace = document.querySelector('#crrMusicSptLink')
  const youtubeLinkPlace = document.querySelector('#crrMusicYtLink')
  const soundcloudLinkPlace = document.querySelector('#crrMusicSdclLink')

  const crrMusic = {
    name: music.name,
    artist: artists(music.artists, 'name'),
    image: music.album.images[1].url,
    bigImage: music.album.images[0].url,
    popularity: music.popularity,
    duration: music.duration_ms,
    realiseDate: music.album.release_date,
    explicited: music.explicit,
    sptLink: music.external_urls.spotify,
    ytLink: `https://www.youtube.com/results?search_query=${music.name}+from+${prepareString(artists(music.artists, 'name'))}`,
    sdclLink: `https://soundcloud.com/search?q=${music.name}%20from%20${prepareString(artists(music.artists, 'name'))}`

  }

  namePlace.innerHTML = crrMusic.name
  artistPlace.innerHTML = crrMusic.artist
  imagePlace.src = crrMusic.image
  popularityPlace.innerHTML = crrMusic.popularity
  durationPlace.innerHTML = convertMsToMin(+crrMusic.duration)
  realiseDatePlace.innerHTML = crrMusic.realiseDate
  crrMusic.explicited ? explicitedPlace.classList.remove('hidden') : false
  spotifyLinkPlace.setAttribute('href', crrMusic.sptLink)
  youtubeLinkPlace.setAttribute('href', crrMusic.ytLink)
  soundcloudLinkPlace.setAttribute('href', crrMusic.sdclLink)
}

async function lastPageFunc() {
  try {
    const crrSong = {
      trackId: getUrlVar('track'),
      artistId: getUrlVar('artist')
    }

    const music = await getSptApiTrack(crrSong.trackId)
    const msc = {
      trackId: music.id,
      artistId: music.artists[0].id,
      market: music.available_markets
    }

    const recomendedSongs = await getSptApiSimilarResults(msc)
    const imgartist = document.querySelector('#artistImgPlace')
    const placeToRecomend = document.querySelector('#recMus')

    console.log(music)

    buildCrrMusicPlaceMeh(music)

    console.log(recomendedSongs.tracks)

    recomendedSongs.tracks.map(element => {

      recomendFunc(element, placeToRecomend)
    });
  } catch (error) {
    console.error(`FinalPage: ${error.code}`)
  } finally {



  }



  if (!crrSong.trackId || !crrSong.artistId) {
    redirectTo('../index.html')
  }

}

function recomendFunc(music, placeRec) {
  const crrMusic = {
    name: music.name,
    artist: artists(music.artists, 'name'),
    trackId: music.id,
    image: music.album.images[1].url,
    bigImage: music.album.images[0].url,
    popularity: music.popularity,
    duration: music.duration_ms,
    realiseDate: music.album.release_date,
    explicited: music.explicit,
    sptLink: music.external_urls.spotify,
    ytLink: `https://www.youtube.com/results?search_query=${music.name}+from+${prepareString(artists(music.artists, 'name'))}`,
    sdclLink: `https://soundcloud.com/search?q=${music.name}%20from%20${prepareString(artists(music.artists, 'name'))}`

  }

  buildFinalMusicCard(crrMusic.name, crrMusic.artist, crrMusic.image, crrMusic.trackId, crrMusic.sptLink, crrMusic.ytLink, crrMusic.sdclLink, placeRec)

}
if (document.querySelector('#recMus')) {

  document.querySelector('#recMus').addEventListener('DOMNodeInserted', (e) => {
    let meh = e.target
    console.log(meh.querySelector('.playSong'))
    // let meh = e.target.querySelector('.playSong')
    // addEvent(meh)
  })
}

let dataUserMusic, navBarMeh, meh2, changerMeh

if (checkifIndex()) {

  putWallpaper(placeImg)
  let meh = document.querySelector('HTML')

  navBarMeh = document.querySelector('#navbar')
  meh2 = navBarMeh.firstElementChild;

  if (!meh.hasAttribute('data-theme')) {
    meh.setAttribute('data-theme', 'dark')
  }

}

if (document.querySelector('#availableDataLonger')) {
  dataUserMusic = document.querySelector('#availableDataLonger')
}

async function putWallpaper(where) {
  try {
    async function yourFunction() {
      let randomSong = await getSptApiRandomResults()
      if (randomSong) {
        for (let index = 0; index < randomSong.length; index++) {
          where.removeAttribute('style')
          where.setAttribute('style', `background-image: url(${randomSong[index].musicData.album.images[0].url});`)
          await delay(5000)
        }
        setTimeout(yourFunction, 0);
      }

    }
    yourFunction();

  } catch (error) {
    console.error(error)
    async function yourFunction() {

      let randomSong = await getSptApiRandomResults()

      where.removeAttribute('style')
      where.setAttribute('style', `background-image: url(${randomSong[0].musicData.album.images[0].url});`)
      setTimeout(yourFunction, 5000);
    }

    yourFunction();
  }

}

if (pageMustHaveAll()) {

}

function putRightIconMeh() {
  const mehEl = document.querySelector('HTML')
  let changerMeh = meh2.shadowRoot.querySelector('#themeChanger')

  if (changerMeh) {


    if (mehEl.getAttribute('data-theme') == 'dark') {
      changerMeh.cheked = false

    } else {
      changerMeh.cheked = true

    }
  }
}

function themeAddEvent() {
  changerMeh.addEventListener('click', () => {
    if (changerMeh.checked) {
      changerMeh.cheked = false
      changeTheme('dark')
    } else {
      changerMeh.cheked = true
      changeTheme('light')
    }
  })
}

function checkIfProfile() {
  let mah = document.querySelector('#profilePage')
  if (mah) {
    return true
  } else {
    return false
  }
}

async function buildProfileDiv() {

  const userMeh = JSON.parse(localStorage.getItem('user'))

  console.log(userMeh)

  const places = {
    img: document.querySelector('#userImgPlace'),
    name: document.querySelector('#userNamePlace'),
    email: document.querySelector('#userEmailPlace'),
    date: document.querySelector('#userAccountDate')
  }

  places.img.src = `${userMeh.photoURL}`
  places.name.innerHTML = `${userMeh.displayName}`
  places.email.innerHTML = `${userMeh.email}`
  places.date.innerHTML = `${gimmeDatePls(await userMeh.createdAt)}`

  const deleteAccountBtn = document.querySelector('#deleteUserAccount')

  deleteAccountBtn.addEventListener('click', () => {

    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      localStorage.removeItem('user')
      signOut(auth).then(() => {
        alert('User deleted, u are being redirected')
        redirectTo('../index.html')
      }).catch((err) => {
        console.error(err)
      })
    }).catch((error) => {
      if (error.code == 'auth/requires-recent-login') {
        alert('To delete your account, you must have signed in recently');
      }
    });

  })

}

function gimmeDatePls(timestampedDate) {

  const date = new Date(+timestampedDate)
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()

  return dateFormat

}

function getUrlVar(whichOne) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  let elementChose = urlParams.get(whichOne)

  return elementChose

}

onAuthStateChanged(auth, user => {

  controlUserLocation()
  try {

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))

      if (pageMustHaveAll()) {
        let nav = document.querySelector('#navbar')
        let son = nav.firstElementChild
        let logOutBtn = son.shadowRoot.querySelector("#LogOutBtn")

        addBtnLogOut(logOutBtn)


      }

      if (checkIfProfile()) {
        buildProfileDiv()
      }
    } else {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
      }

    }

  } catch (error) {

  } finally {
    putThemeAccordinglyStorage()
    checkIfLastPage()
    if (checkIfSearchPage()) {
      const place = document.querySelector('#searchContent')
      if (user) {

        
        place.innerHTML = `<div>
        <div class="bg-base-500 text-center text-primary-content p-8 ">
          <p><h1>History</h1></p>
        </div>

        <div>
        <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th class="text-secondary">Music</th>
              <th class="text-secondary">Artist</th>
              <th class="text-secondary">SEarch Similar</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr>
              <th class="text-secondary">1</th>
              <td>Byob</td>
              <td>System Of A Down</td>
              <td><a><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
            </tr>
            <!-- row 2 -->
            <tr>
              <th class="text-secondary">2</th>
              <td>Walk</td>
              <td>Pantera</td>
              <td><a><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
            </tr>
            <!-- row 3 -->
            <tr>
              <th class="text-secondary">3</th>
              <td>Symphony Of Destruction</td>
              <td>Megadeth</td>
              <td><a><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>


        </div>`



      } else {
        place.innerHTML = `<div>
        <div class="bg-base-500 text-center text-primary-content p-8 ">
          <p>Log into an account to save your history</p>
        </div>
        <div class="bg-base-500 text-center text-primary-content ">
          <a href="../pages/signIn.html" class="hover:text-secondary">Login <i class="fa-solid fa-link"></i></a> / <a href="../pages/signUp.html" class="hover:text-secondary">Register <i class="fa-solid fa-link"></i></a>
        </div>
      </div>`
      }
    }
  }

});


function checkIfSearchPage() {
  if (document.querySelector('#contentSearch')) {
    return true
  } else {
    return false
  }
}

function putThemeAccordinglyStorage() {

  changeTheme(localStorage.getItem("theme"))

}

function isPrivatePage() {
  let meh = document.querySelector('#mustHaveUser')

  if (meh) {
    return true
  } else {
    return false
  }
}

function isOutsidePage() {
  let moh = document.querySelector('#notUsersHere')

  if (meh) {
    return true
  } else {
    return false
  }
}

function controlUserLocation() {
  if (isPrivatePage()) {
    if (!localStorage.getItem('user')) {
      redirectTo('../index.html')
    }
  }
}


if(document.querySelector('#musicSug')){
  document.querySelector('#retry').addEventListener('click', () => {
    lastPageFunc()
  })
}


