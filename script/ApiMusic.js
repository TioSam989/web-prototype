// https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=SystemOfADown&track=BYOB&api_key=0394adacbab6526b446f377465aae302&limit=10
const API_key = "0394adacbab6526b446f377465aae302"
const ownnerName = "tiosamna"

const musicName = document.querySelector("#musicName")
const artistName = document.querySelector("#artistName")

const searchBtn = document.querySelector("#searchBtn")

function getAPIData(artist, music,  limit) {
    const URL = `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&track=${music}&artist=${artist}&api_key=${API_key}&limit=${limit}&format=json&autocorrect=1`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    console.clear()
    console.log(URL)

    fetch(URL, options)
        .then(res => { 
            res.json()
                .then( data => {
                    let beforeTrack = Object.values(data)[0]
                    let track = Object.values(beforeTrack)[0]
                    
                    Object.keys(track).forEach(function(keys) {
                        let currentSoung = track[keys]

                        let name = currentSoung.name
                        let artist = currentSoung.artist.name

                        // console.log(currentSoung)
                        console.log(`Listen to ${name} from ${artist}`)
                    });
                    
                })
                .catch( e => console.log(`i'm broke: ${e.message}`))
        
        })
        .catch()

}

function prepareString(someString) {
    return someString.replaceAll(" ", "+")
}

searchBtn.addEventListener('click', (e) => {
    console.log(`artist: ${artistName.value}`)
    console.log(`music: ${musicName.value}`)

    getAPIData(prepareString(artistName.value), prepareString(musicName.value),  `5`)

    // e.preventDefault()
});