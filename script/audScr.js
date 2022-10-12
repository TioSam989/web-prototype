import {hiddenElement, prepareArr, buildMusicSquare, musicNotFound} from './ApiMusic'


const API_key = "0394adacbab6526b446f377465aae302"

function prepareMusicName(musicName) {
    let ganbiarraStr = musicName.replace(/\s*\(.*?\)\s*/g, '')
    // ganbiarraStr.replace(/\s/g, "")

    if (ganbiarraStr != "" || ganbiarraStr != null) {
        return ganbiarraStr
    } else {
        return musicName
    }
}

function getAPISearchResults(music, limit) {

    listResults.value = ""
    if (music == "") {
        hiddenElement(divResults)
    } else {


        const searchURL = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${music}&api_key=0394adacbab6526b446f377465aae302&format=json&limit=${limit}`

        const options = {
            method: 'get',
            mode: 'cors',
            cache: 'no-store',
            timeout: 1000
        }

        fetch(searchURL, options)
            .then(res => {
                res.json()
                    .then(data => {

                        // USE DEBOUNCE//LUCIANO DISS

                        let beforeTracks = Object.values(data)[0]
                        let stillBeforeTracks = Object.values(beforeTracks)[4]
                        let track = Object.values(stillBeforeTracks)[0]

                        let musicList = []

                        Object.keys(track).map(function (keys) {

                            let currentSoung = {
                                name: prepareMusicName(track[keys].name),
                                artist: track[keys].artist
                            }
                            musicList.push(currentSoung)
                            return musicList
                        })
                    }).catch(e => console.error(`i'm broke: ${e.message}`))

            })
    }
}

function getAPISimilarData(music, artist, limit) {
    const URL = `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&track=${music}&artist=${artist}&api_key=${API_key}&limit=${limit}&format=json&autocorrect=1`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    return fetch(URL, options)
        .then(res => {
            return res.json()
                .then(data => {

                    return data

                })

        })
        .catch(e => musicNotFound(e.message))

}

export {getAPISearchResults,getAPISimilarData}