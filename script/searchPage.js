
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { getDatabase, ref, onValue } from "firebase/database";
import { validateArgCount } from "@firebase/util";
import { getSptApiTrack } from "./spt"
import { artists } from './sptSearch'
import { gimmeDatePls, convertMsToMin } from './functions'

const database = getDatabase();

const place = document.querySelector('#searchContent')

let LoggedShitDataLongerBefore = `<span id="notAddEvent"></span> <div class="bg-base-500 text-center text-primary-content p-8 ">
<p>
<h1>History</h1>
</p>
</div>

<div>
<div class="overflow-x-auto">
    <table class="table table-normal xs:table-compact w-full">
        <!-- head -->
        <thead>
            <tr>
                <th></th>
                <th>Music</th>
                <th>Artist(s)</th>
                <th>duration</th>
                <th>Searched At</th>
            </tr>
        </thead>
        <tbody>`

let LoggedShitDataLongerAfter = `</tbody>
</table>
</div>
</div>`

let LoggedShitNoDataLonger = `<span id="notAddEvent"></span><div>
<div class="text-center">
<p class="text-secondary">Tip<p>
</div>
<div class="bg-base-500 text-center p-8 ">
  <p>No data to show yet</p>
</div>
</div>`

let UnloggedShit = `<span id="notAddEvent"></span><div>
<div class="text-center">
<p class="text-secondary">Tip<p>
</div>
<div class="bg-base-500 text-center p-8 ">
  <p>Log into an account to save your history</p>
</div>
<div class="bg-base-500 text-center ">
  <a href="../pages/signIn.html" class="hover:text-secondary">Login <i class="fa-solid fa-link"></i></a> / <a href="../pages/signUp.html" class="hover:text-secondary">Register <i class="fa-solid fa-link"></i></a>
</div>
</div>`


onAuthStateChanged(auth, user => {
  if (user) {
    const dbRef = ref(database)


    onValue((ref(database, '/users/' + user.uid + '/history/')), (snapshot) => {
      var songList = []
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        songList.push(childData)

      })
      showLoggedData(songList)
    });

  } else {
    showUnloggedData()
  }

});

async function showLoggedData(musicList) {

  if (musicList.length === 0) {
    place.innerHTML = LoggedShitNoDataLonger
  } else {
    place.innerHTML = LoggedShitDataLongerBefore
    var listObjs = []
    musicList.forEach(async (element) => {

      let music = await getSptApiTrack(element.trackId)

      let msc = {
        name: music.name,
        artists: artists(music.artists, 'name'),
        duration: music.duration_ms,
        searchedAt: element.at
      }


      console.log(msc)

      place.innerHTML += `<tr>
      <th>Pos</th>
      <td>${msc.name}</td>
      <td>${msc.artists}</td>
      <td>${convertMsToMin(msc.duration)}</td>
      <td>${gimmeDatePls(msc.searchedAt)}</td>
  </tr>`


      console.log(listObjs)
    })

    place.innerHTML += LoggedShitDataLongerAfter


  }

}

function showUnloggedData() {
  place.innerHTML = UnloggedShit
}