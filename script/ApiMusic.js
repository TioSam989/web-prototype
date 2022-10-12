// https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=SystemOfADown&track=BYOB&api_key=0394adacbab6526b446f377465aae302&limit=10


import { getSptApiSearchResults, getSptApiSimilarResults, sptToken, tokenData } from './spt' //spotify
import { getAPISearchResults, getAPISimilarData } from './audScr'
import 'clickout-event';

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
const debouncedgetSptApiSearchResults = debounce(getSptApiSearchResults(1000))

const myApis = {
    first: "audioscrobbler",
    second: "musicovery",
    third: "spotify"
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

function prepareArr(list, limit) {
    listResults.innerHTML = ""

    let listUniq = [...new Set(list)]

    for (let i = listUniq.length; i > limit; i--) {
        listUniq.shift()
    }
    return listUniq
}

function buildMusicSquare(music, spt = false) {
    
    let newOption = document.createElement('option')

    newOption.text = `${music.name} from ${music.artist}`

    if (spt) {


        newOption.value = `${music.trackId} - ${music.artistId} - ${music.market}`
        newOption.setAttribute("id", `${music.trackId}-${music.market}`)
    } else {
        newOption.value = `${music.name},${music.artist}`
        newOption.setAttribute("id", `${music.name}-${music.artist}`)
    }


    listResults.appendChild(newOption)
}

function musicNotFound(message) {
    console.error(message)
}

function prepareString(someString) {
    return someString.replaceAll(" ", "+")
}

function hiddenElement(elementMeh) {
    // elementMeh.setAttribute("hidden", "hidden")
}

function showElement(elementMeh) {
    elementMeh.removeAttribute("hidden", "hidden")
}

function prepareData(data, wichApi, extra) {
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

    } else if (wichApi == myApis.second) {

        if (extra) {
            let beforeTrack = Object.values(data)[2]
            let track = Object.values(beforeTrack)[0]

            let suggestionList = []

            Object.keys(track).map(function (Keys) {

                let currentSoung = {

                    name: track[Keys].title,
                    artist: track[Keys].artist.name,
                    id: track[Keys].id
                }
                suggestionList.push(currentSoung)
            })


        } else {
            console.log(data)
            let beforeTrack = Object.values(data)
            let track = Object.values(beforeTrack[2])

            let currentSoung = {
                name: track[1],
                artist: track[4].name,
                id: track[0]
            }
            return currentSoung
        }
    }
}

function prepareArrayFromApi(list, limit) {
    let listUniqMeh = [...new Set(list)]

    for (let i = listUniqMeh.length; i > limit; i--) {
        listUniqMeh.shift()
    }

    if (list == undefined || !list) {
        throw "list indefinied"
    }

    return listUniqMeh
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

function renderMusicRec(music) {
    console.log(music)
    appMusicRecomendations.innerHTML += `<p>Listen to ${music.name} from ${music.artist} </p>`
}

function clearMusicList() {
    appMusicRecomendations.innerHTML = ""
}

async function SelectOpt(music, spt = false) {
    hiddenElement(divResults)

    musicName.value = `${music.name}`

    if (spt) {
        try {

            try {
                let similarData = await getSptApiSimilarResults(music)
            } catch (error) {
                console.error(error)
            }

        } catch (err) {
            console.error(err)
        }
    } else {

        try {
            const obj = await getAPISimilarData(prepareString(music.name), prepareString(music.artist), 5)
            let meh = prepareArrayFromApi(prepareData(obj, myApis.first, 5), 5)

            try {
                if (meh.length == 0) {
                    throw 'Music Not Found'
                }
                clearMusicList()
                meh.map(element => {
                    renderMusicRec(element)
                });
            } catch (e) {
                console.error(e)
                if (e == 'Music Not Found') {
                    clearMusicList()
                    musicNotFound()
                }

            }

        } catch (err) {
            console.error(err)
        }
    }

}

listResults.addEventListener("change", function () {
    try {
        let string = listResults.value
        
        let musicMeh = string.split(" - ")
        console.log(`musicMeh: ${musicMeh}`)
        let optSelected = {
            trackId: musicMeh[0],
            artistId: musicMeh[1],
            market: musicMeh[2]
        }

        SelectOpt(optSelected, true)

    } catch (err) {
        console.error(err)
        try {

            console.log('Using option B to select opt on change event')

            let string = listResults.value
            let musicMeh = string.split(",")
            let optSelected = {
                name: musicMeh[0],
                artist: musicMeh[1]
            }

            SelectOpt(optSelected)
        } catch (error) {
            console.error(error)
        }
    }
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

            try {
                SelectOpt(optSelected, true)

            } catch (err) {
                console.error(err)
                try {
                    console.log('using option B to Select Option on keypress')
                    SelectOpt(optSelected)
                } catch (error) {
                    console.error(error)
                }
            }

        }
    }
})

musicName.addEventListener('focus', (e) => {
    if (checkElement(musicName.value) == true) {

        if (listResults.childElementCount == 0) {

            try {

                let sptSearchData = debouncedgetSptApiSearchResults(musicName.value)
                sptSearchData.map(element => {
                    buildMusicSquare(element, true)
                });

            } catch (err) {

                console.error(err)

                try {
                    console.log('using Option B to search on focus')
                    debouncedgetAPISearchResults(prepareString(musicName.value), 5)
                } catch (error) {
                    console.error(error)
                }
            }

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

musicName.addEventListener('input', async (e) => {
    if (checkElement(musicName.value) == false) {
        hiddenElement(divResults)
    } else {
        showElement(divResults)
        listResults.value = ""

        try {
            listResults.innerHTML = ""
            listResults.value = ""

            console.clear()

            let sptSearchData = await getSptApiSearchResults((musicName.value))
            sptSearchData.map(element => {
                buildMusicSquare(element, true)
            });

        } catch (err) {
            console.error(err)
            try {
                console.log('using option B to Search on input')
                getAPISearchResults(prepareString(musicName.value), 5)

            } catch (error) {
                console.error(error)
            }

        }
    }
})

export { hiddenElement, prepareArr, buildMusicSquare, musicNotFound }