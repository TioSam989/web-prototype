import { onAuthStateChanged, signOut, getAuth, sendEmailVerification } from "firebase/auth"
import { auth } from "../firebase"
import { addBtnVerifyEmail, addBtnLogOut, appendAnchorTag } from "./functions"
import '../style/output.css';
import 'animate.css';
import { getSptApiRandomResults } from './sptRandom'
import styled from "daisyui/dist/styled";

const placeImg = document.querySelector('#imgPlace')
const delay = ms => new Promise(res => setTimeout(res, ms));

if (true) {

  putWallpaper(placeImg)
}

async function putWallpaper(where) {


  try {

    async function yourFunction() {

      let randomSong = await getSptApiRandomResults()
      for (let index = 0; index < randomSong.length; index++) {

        where.removeAttribute('style')
        where.setAttribute('style', `background-image: url(${randomSong[index].musicData.album.images[0].url});`)
        await delay(5000)

      }

      
      console.log(randomSong)
      setTimeout(yourFunction, 0);
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

onAuthStateChanged(auth, user => {
  if (user) {

    let nav = document.querySelector('#navbar')
    let son = nav.firstElementChild
    let logOutBtn = son.shadowRoot.querySelector("#LogOutBtn")
    console.log(logOutBtn)


    addBtnLogOut(logOutBtn)


  } else {

    console.log('Not logged');
    document.querySelector("#logOutApp").innerHTML = ""
    document.querySelector("#verif").innerHTML = ""
  }

});

