import { debounce, musicNotFound, prepareArrayFromApi, prepareString, prepareData, clearMusicList, myApis, renderMusicRec } from './ApiMusic'

const debouncedSearchTrack = debounce(searchTrack, 0)

async function getSimilarTrack(track, artist, limit = 5) {
    try {
        let crrTrack = await getMusicData(track, artist)
        
        console.log(crrTrack)
        const obje = await getSimilarDataSongById(crrTrack.id)
        const allObj = prepareArrayFromApi(obje)
        let meh = prepareArrayFromApi(prepareData(allObj, myApis.second, true), limit)

        try {

        } catch (e) {
            console.error(e)
        }

    }
    catch (err) {
        console.error(err)
    }
}

async function getMusicData(track, artist) {
    const objec = await debouncedSearchTrack(prepareString(track), prepareString(artist))
    console.log(objec)
    const currentSoung = prepareData(objec, myApis.second)

    return currentSoung
}

function getSimilarDataSongById(id) {
    const URL = `https://musicovery.com/api/V5/track.php?fct=getsimilar&id=${id}`
    const options = {
        method: 'GET',
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

function searchTrack(track, artist) {
    const URL = `https://musicovery.com/api/V5/track.php?fct=search&title=${track}&artistname=${artist}`
    const options = {
        method: 'GET',
        cache: 'default'
    }

    return fetch(URL, options)
        .then(res => {
            return res.json()
                .then(data => {
                    return data 
                })
        })
        .catch(e => musicNotFound(`${e.message} from second API`))
}

export { getSimilarTrack }

//missing call getSimilarTrack func ai ApiMusic.js