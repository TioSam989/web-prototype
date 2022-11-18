import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"
import { addBtnLogOut, checkifIndex, getCrrTheme, changeTheme, pageMustHaveAll } from "./functions"
import '../style/output.css';
import 'animate.css';
import { getSptApiRandomResults } from './sptRandom'
import styled from "daisyui/dist/styled";

const placeImg = document.querySelector('#imgPlace')
const delay = ms => new Promise(res => setTimeout(res, ms));

let navBarMeh
let meh2

if (checkifIndex()) {

  putWallpaper(placeImg)
  let meh = document.querySelector('HTML')

  navBarMeh = document.querySelector('#navbar')
  meh2 = navBarMeh.firstElementChild;

  if (!meh.hasAttribute('data-theme')) {
    meh.setAttribute('data-theme', 'dark')
  }
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





  // for (let index = 0; index < randomSong.length; index++) {

  //   setTimeout(() => {
  //     console.log(randomSong[index])
  //     where.removeAttribute('style')
  //     where.setAttribute('style', `background-image: url(${randomSong[index].musicData.album.images[0].url});`)
  //   }, 3000)
  // }

  // setTimeout(() => {
  //   // where.removeAttribute('style')
  //   where.setAttribute('style', `background-image: url(${img});`)
  // }, 2000);

}

let changerMeh

if (pageMustHaveAll()) {
  setTimeout(() => {
    changerMeh = meh2.shadowRoot.querySelector('#themeChanger')

  }, 100);
}

function putRightIconMeh() {
  const mehEl = document.querySelector('HTML')
  if (mehEl.getAttribute('data-theme') == 'dark') {
    changerMeh.cheked = false

  } else {
    changerMeh.cheked = true

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
    } 3
  })
}

onAuthStateChanged(auth, user => {

  try {


    if (user) {
      if (pageMustHaveAll()) {
        let nav = document.querySelector('#navbar')
        let son = nav.firstElementChild
        let logOutBtn = son.shadowRoot.querySelector("#LogOutBtn")

        addBtnLogOut(logOutBtn)

        setTimeout(() => {
          putRightIconMeh()
          themeAddEvent()
        }, 100);
      }
    } else {
      setTimeout(() => {
        putRightIconMeh()
        themeAddEvent()
      }, 100);
    }

  } catch (error) {

  } finally {
    putThemeAccordinglyStorage()
  }

});

function putThemeAccordinglyStorage(){
  
  changeTheme(localStorage.getItem("theme"))

}
