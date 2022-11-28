import {addEvent} from './functions'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { getUrlVar } from "./functions"
import { getDatabase, ref, onValue } from "firebase/database";

const crrMusicId = getUrlVar('track')

document.querySelector('#recMus').addEventListener('DOMNodeInserted', (e) => {
    let targetPrimary = e.target
    
    let meh = targetPrimary.querySelector('.playSong')
    addEvent(meh)
  })

  onAuthStateChanged(auth, user => {
    if (user) {

      var firebaseRef = getDatabase().ref(`${user.uid}`)
      firebaseRef.push(crrMusicId)
  
    }
  
  });
  


