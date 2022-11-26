import {addEvent} from './functions'

document.querySelector('#recMus').addEventListener('DOMNodeInserted', (e) => {
    let targetPrimary = e.target
    
    let meh = targetPrimary.querySelector('.playSong')
    console.log(meh)
    addEvent(meh)
  })