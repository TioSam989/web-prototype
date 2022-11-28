
import { initializeApp } from 'firebase/app';
import {  getAuth, onAuthStateChanged  } from 'firebase/auth';
import { getDatabase } from 'firebase/database'


const firebaseApp = initializeApp({

    apiKey: "AIzaSyBJU-0mDBzZ_NV42nmYIeM3jkrMLJ4hP94",
    authDomain: "meh-test-89d1d.firebaseapp.com",
    projectId: "meh-test-89d1d",
    storageBucket: "meh-test-89d1d.appspot.com",
    messagingSenderId: "903344881415",
    appId: "1:903344881415:web:41de2b21159eb3b4e3cfa2",
    measurementId: "G-6ZX0G3RY2S",
    databaseURL: "https://meh-test-89d1d-default-rtdb.europe-west1.firebasedatabase.app"

});

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

onAuthStateChanged(auth ,user => {
    if(user){

    }else{

    }

});

export { auth, database, firebaseApp}
/**
 * getRedirectResult is unused and should not be included in the code base.
 * In addition, there are many other functions within firebase/auth that are
 * not imported and therefore should not be included as well.
 */