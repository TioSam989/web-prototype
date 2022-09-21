// https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=SystemOfADown&track=BYOB&api_key=0394adacbab6526b446f377465aae302&limit=10

import 'clickout-event';

const API_key = "0394adacbab6526b446f377465aae302"

const musicName = document.querySelector("#musicName")
const artistName = document.querySelector("#artistName")

const searchBtn = document.querySelector("#searchBtn")

const listResults = document.querySelector("#listResults")

const divResults = dadOf(listResults)

const contentSearchDiv = dadOf(divResults)

const appMusicRecomendations = document.querySelector("#appMusicRec")

const debouncedgetAPISimilarData = debounce(getAPISimilarData, 2000)
const debouncedgetAPISearchResults = debounce(getAPISearchResults, 0)
const debouncedSimilarData = debounce(SelectOpt, 0)

const myApis = {
    first: "audioscrobbler"
}

function dadOf(element) {
    let el = element.parentNode
    return el
}

function debounce(fn, delay = 1) {
    let previousTimeOut;
    return function (...params) {
        clearTimeout(previousTimeOut)

        previousTimeOut = setTimeout(() => {
            fn(...params)
        }, delay);
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
                            prepareArr(musicList, limit).map(element => buildMusicSquare(element))

                        })
                    }).catch(e => console.error(`i'm broke: ${e.message}`))

            })
    }
}

function prepareMusicName(musicName) {
    let ganbiarraStr = musicName.replace(/\s*\(.*?\)\s*/g, '')
    // ganbiarraStr.replace(/\s/g, "")

    if (ganbiarraStr != "" || ganbiarraStr != null) {
        return ganbiarraStr
    } else {
        return musicName
    }
}

function getTrackId(music, artist) {
    const SearchURL = `https://musicovery.com/api/V5/track.php?fct=search&title=${music}`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    //return trackID using fetch here



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

function prepareArr(list, limit) {
    listResults.innerHTML = ""

    let listUniq = [...new Set(list)]

    for (let i = listUniq.length; i > limit; i--) {
        listUniq.shift()
    }
    return listUniq
}

function buildMusicSquare(music) {
    let newOption = document.createElement('option')
    newOption.value = `${music.name},${music.artist}`
    newOption.text = `${music.name} from ${music.artist}`
    newOption.setAttribute("id", `${music.name}-${music.artist}`)
    listResults.appendChild(newOption)
}

function musicNotFound(message) {
    let newOption = document.createElement('option')
    newOption.text = `music not found`
    console.warn(message)
    listResults.appendChild(newOption)

}

function prepareString(someString) {
    return someString.replaceAll(" ", "+")
}

function hiddenElement(elementMeh) {
    elementMeh.setAttribute("hidden", "hidden")
}

function showElement(elementMeh) {
    elementMeh.removeAttribute("hidden", "hidden")
}

function prepareData(data, wichApi) {
    if (wichApi == myApis.first) {

        let beforeTrack = Object.values(data)[0]
        let track = Object.values(beforeTrack)[0]


        let suggestionList = []

        Object.keys(track).map(function (keys) {

            let currentSoung = {
                name: track[keys].name,
                artist: track[keys].artist.name,
            }
            suggestionList.push(currentSoung)

            
            
        });
        return suggestionList

    }
}

function prepareArrayFromApi(list, limit){
    let listUniqMeh = [...new Set(list)]

    for (let i = listUniqMeh.length; i > limit; i--) {
        listUniqMeh.shift()
    }

    if(list == undefined || !list){
        throw "list indefinied"
    }

    return listUniqMeh
}

function myFunc(music, artist, limit) {
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
}

function separateStringByLetter(str) {
    let meh = str.split('')
    let mehList = []

    for (let index = 0; index < meh.length; index++) {

        if (meh[index] != " ") {
            mehList.push(meh[index])
        }
    }
    return mehList
}

function checkIfDoesExists(what) {
    if (what == undefined || what == null) {
        return false
    } else {
        return true
    }
}

function checkElement(elE) {

    if (checkIfDoesExists(elE) == false) {
        return false
    } else {

        let arr = []

        arr = separateStringByLetter(elE)

        if (arr.length == 0) {
            return false
        } else {
            return true
        }
    }
}

function renderMusicRec(music){
    console.log(music)
    appMusicRecomendations.innerHTML += `<p>Listen to ${music.name} from ${music.artist} </p>`
}

async function SelectOpt(music) {
    hiddenElement(divResults)

    musicName.value = `${music.name}`

    try {
        const obj = await getAPISimilarData(prepareString(music.name), prepareString(music.artist), 5)
        let meh = prepareArrayFromApi(prepareData(obj, myApis.first, 5), 5)
        
        try{
            meh.map(element => {
                renderMusicRec(element)
            });
        } catch (e) {
            console.error(e)
        }
        
    } catch (err) {
        console.error(err)
    }

}

listResults.addEventListener("change", function () {
    let string = listResults.value
    let musicMeh = string.split(",")
    let optSelected = {
        name: musicMeh[0],
        artist: musicMeh[1]
    }

    SelectOpt(optSelected)
})

musicName.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        if (checkIfDoesExists(musicName.value) == false) {
            let newOption = document.createElement('option')
            newOption.text = `empty`
            listResults.appendChild(newOption)
        } else {
            let string = listResults[0].value
            let musicMeh = string.split(",")
            let optSelected = {
                name: musicMeh[0],
                artist: musicMeh[1]
            }

            SelectOpt(optSelected)

        }
    }
})

musicName.addEventListener('focus', (e) => {
    if (checkElement(musicName.value) == true) {

        if (listResults.childElementCount == 0) {
            debouncedgetAPISearchResults(prepareString(musicName.value), 5)
        } else {

            showElement(divResults)
        }
    }
})

contentSearchDiv.addEventListener('clickout', (e) => {
    hiddenElement(divResults)
})

contentSearchDiv.addEventListener('mouseover', (e) => {
    if (checkElement(musicName.value) == true) {
        showElement(divResults)
    }
})

contentSearchDiv.addEventListener('mouseout', (e) => {
    hiddenElement(divResults)
})

musicName.addEventListener('input', (e) => {
    if (checkElement(musicName.value) == false) {
        hiddenElement(divResults)
    } else {
        showElement(divResults)
        getAPISearchResults(prepareString(musicName.value), 5)
    }
})