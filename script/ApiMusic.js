// https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=SystemOfADown&track=BYOB&api_key=0394adacbab6526b446f377465aae302&limit=10
const API_key = "0394adacbab6526b446f377465aae302"

const musicName = document.querySelector("#musicName")
const artistName = document.querySelector("#artistName")

const searchBtn = document.querySelector("#searchBtn")

function getAPISearchResults(music){
    const searchURL = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${music}&api_key=0394adacbab6526b446f377465aae302&format=json&limit=5`

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(searchURL, options)
    .then(res => {
        res.json()
            .then( data => {

                
                let beforeTracks = Object.values(data)[0]
                let stillBeforeTracks = Object.values(beforeTracks)[4]
                let track = Object.values(stillBeforeTracks)[0]
                // console.log(tracks)
                Object.keys(track).forEach(function (keys) {


                    let currentSoung = {
                        name: track[keys].name,
                        artist: track[keys].artist
                    }

                    getAPISimilarData(prepareString(currentSoung.artist),prepareString(currentSoung.name), '10')
                })
            })
    })
}

function getAPISimilarData(artist, music,  limit) {
    const URL = `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&track=${music}&artist=${artist}&api_key=${API_key}&limit=${limit}&format=json&autocorrect=1`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    console.log(URL)

    fetch(URL, options)
        .then(res => { 
            res.json()
            .then( data => {
                
                    let beforeTrack = Object.values(data)[0]
                    let track = Object.values(beforeTrack)[0]
                    

                    Object.keys(track).forEach(function(keys) {
                        
                        let currentSoung = {
                            name: track[keys].name,
                            artist: track[keys].artist.name,
                        }
                        
                        buildMusicSquare(currentSoung)
                        console.log(currentSoung)

                        // console.log(`Listen to ${currentSoung.name} from ${currentSoung.artist}`)
                    });
                    
                })
                .catch( e => console.log(`i'm broke: ${e.message}`))
        
        })
        .catch()

}

function buildMusicSquare(music){
    //code here
}

function prepareString(someString) {
    return someString.replaceAll(" ", "+")
}

searchBtn.addEventListener('click', (e) => {
    getAPISearchResults( prepareString(musicName.value))

    // e.preventDefault()
});