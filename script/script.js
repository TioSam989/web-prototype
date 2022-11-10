import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"
import { addBtnVerifyEmail, addBtnLogOut, appendAnchorTag } from "./functions"
import '../style/output.css';
import 'animate.css';
import { getSptApiRandomResults } from './sptRandom'
import styled from "daisyui/dist/styled";

const placeImg = document.querySelector('#imgPlace')

if (true) {

  putWallpaper(placeImg)
}

async function putWallpaper(where) {



  async function yourFunction() {

    let randomSong = await getSptApiRandomResults()

    where.removeAttribute('style')
    where.setAttribute('style', `background-image: url(${randomSong[0].musicData.album.images[0].url});`)
    setTimeout(yourFunction, 5000);
  }

  yourFunction();






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

onAuthStateChanged(auth, user => {
  if (user) {

    let nav = document.querySelector('#navbar')
    let son = nav.firstElementChild
    let logOutBtn = son.shadowRoot.querySelector("#LogOutBtn")
    console.log(logOutBtn)


    addBtnLogOut(logOutBtn)
    console.log(`logged in ${user.displayName}`)
    console.log(user)
    document.querySelector("#App").innerHTML = `Hello ${user.displayName}`

    // <a href="./pages/signIn.html">sign In</a>
    // <a href="./pages/signUp.html">sign Up</a>

    if (!user.emailVerified) {
      addBtnVerifyEmail(user)
    }

  } else {

    appendAnchorTag('appLog', 'a', './pages/signUp.html', 'sign up')
    appendAnchorTag('appLog', 'a', './pages/signIn.html', 'sign in')
    console.log('Not logged');
    document.querySelector("#App").innerHTML = `Hello Guest`
    document.querySelector("#logOutApp").innerHTML = ""
    document.querySelector("#verif").innerHTML = ""
  }

});

