// https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=SystemOfADown&track=BYOB&api_key=0394adacbab6526b446f377465aae302&limit=10
// getAPISimilarData(prepareString(currentSoung.artist),prepareString(currentSoung.name), '10')


const API_key = "0394adacbab6526b446f377465aae302"

const musicName = document.querySelector("#musicName")
const artistName = document.querySelector("#artistName")

const searchBtn = document.querySelector("#searchBtn")

const listResults = document.querySelector("#listResults")

function getAPISearchResults(music, limit) {

    listResults.value = ""
    if (music == "") {
        hiddenElement(listResults)
    } else {


        const searchURL = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${music}&api_key=0394adacbab6526b446f377465aae302&format=json&limit=${limit}`

        console.clear()
        console.log(searchURL)

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

                        let beforeTracks = Object.values(data)[0]
                        let stillBeforeTracks = Object.values(beforeTracks)[4]
                        let track = Object.values(stillBeforeTracks)[0]

                        let musicList = []

                        Object.keys(track).forEach(function (keys) {

                            let currentSoung = {
                                name: prepareMusicName(track[keys].name),
                                artist: track[keys].artist
                            }
                            musicList.push(currentSoung)
                            prepareArr(musicList, limit).forEach(element => buildMusicSquare(element))

                            // getAPISimilarData(prepareString(currentSoung.artist),prepareString(currentSoung.name), '10')

                        })
                    }).catch(e => console.log(`i'm broke: ${e.message}`))

            })
    }
}

function prepareMusicName(musicName){
    let ganbiarraStr = musicName.replace(/\s*\(.*?\)\s*/g, '')
        // ganbiarraStr.replace(/\s/g, "")

    if(ganbiarraStr != "" || ganbiarraStr != null){
        return ganbiarraStr
    }else{
        return musicName
    }
}

function getTrackId(music, artist){
    const SearchURL = `https://musicovery.com/api/V5/track.php?fct=search&title=${music}`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    //return trackID using fetch here
    

    
}

function getAPISimilarData( music, artist, limit) {
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
                .then(data => {

                    let beforeTrack = Object.values(data)[0]
                    let track = Object.values(beforeTrack)[0]
                    
                    if(track.length == 0){
                        console.log("call option b ")

                        
                    }

                    let suggestionList = []

                    Object.keys(track).forEach(function (keys) {

                        let currentSoung = {
                            name: track[keys].name,
                            artist: track[keys].artist.name,
                        }
                        suggestionList.push(currentSoung)
                        
                        let musicArr = prepareArr(suggestionList, limit)
                        
                        if(Object.keys(musicArr).length == limit){
                            console.table(musicArr)
                        }

                        

                    });

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
    if (!elementMeh.hasAttribute("hidden")) {
        if (checkElement(elementMeh.value) == false) {
            elementMeh.setAttribute("hidden", "hidden")
        }
    }
}

function showElement(elementMeh) {
        elementMeh.removeAttribute("hidden", "hidden")
}

function SelectOpt(music) {
    hiddenElement(listResults)

    musicName.value = `${music.name}`
    
    getAPISimilarData(prepareString(music.name), prepareString(music.artist), 5)

}

function checkElement(elE) {
    let arr = []

    elE.split('')
    for (let index = 0; index < elE.length; index++) {

        if (elE[index] != " ") {
            arr.push(Element)
        }
    }

    if (arr.length == 0) {
        return false
    } else {
        return true
    }
}

// searchBtn.addEventListener('click', (e) => {
//     getAPISearchResults( prepareString(musicName.value))
// });

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
        if (musicName.value == "") {
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
    getAPISearchResults(prepareString(musicName.value), 5)
    if (musicName.value != "") {
        showElement(listResults)
    }
})

musicName.addEventListener('blur', (e) => {
})

musicName.addEventListener('input', (e) => {
    if (musicName.value == "" || musicName.value == null) {
        hiddenElement(listResults)
    } else {

        if (checkElement(musicName.value) == true) {

            showElement(listResults)
            getAPISearchResults(prepareString(musicName.value), 5)
        }
    }
})