
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { getDatabase, ref, onValue } from "firebase/database";
import { validateArgCount } from "@firebase/util";

const database = getDatabase();

const place = document.querySelector('#searchContent')

let LoggedShit = `<div>
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

let UnloggedShit = `<div>
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

    get(child(dbRef, "users"))
      .then((snapshot) => {
        var musics = []

        snapshot.forEach(childSnapShot => {
          musics.push(childSnapShot.validateArgCount())
        });
        console.log(musics)
      })


  } else {
    showUnloggedData()
  }

});

function showLoggedData(userData) {
  place.innerHTML = LoggedShit
}

function showUnloggedData() {
  place.innerHTML = UnloggedShit
}