import { addEvent } from './functions'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { getUrlVar, writeData } from "./functions"
import { getDatabase, ref, onValue } from "firebase/database";

const crrMusicId = getUrlVar('track')

document.querySelector('#recMus').addEventListener('DOMNodeInserted', (e) => {
  let targetPrimary = e.target

  let meh = targetPrimary.querySelector('.playSong')
  addEvent(meh)
})


onAuthStateChanged(auth, user => {


  if (user) {

    let time = new Date().getTime();
    writeData(user.uid, crrMusicId, time)


  }

});





