import {  debounce, musicNotFound, prepareArrayFromApi, prepareString, prepareData, clearMusicList, myApis, renderMusicRec } from ApiMusic

const debouncedSearchTrack = debounce(searchTrack, 0)


function getSimilarTrack(track, artist, limit) {
    try {

        let crrTrack = getMusicData(track, artist)
        let obj = await getSimilarDataSongById(crrTrack.id)
        const allObj = prepareArrayFromApi(obj)
        let meh = prepareArrayFromApi(prepareData(allObj, myApis.second, true), limit)

        try {
            clearMusicList()
            meh.map(element => {
                renderMusicRec(element)
            });
        } catch (e) {
            console.error(e)
        }

    }
    catch (err) {
        console.error(err)
    }
}

function getMusicData(track, artist) {
    const obj = await debouncedSearchTrack(prepareString(track), prepareString(artist))
    const currentSoung = prepareData(obj, myApis.second)

    return currentSoung
}

function getSimilarDataSongById(id) {
    const URL = `https://musicovery.com/api/V5/track.php?fct=getsimilar&id=${id}`
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

function searchTrack(track, artist) {
    const URL = `https://musicovery.com/api/V5/track.php?fct=search&title=${track}&artistname=${artist}`
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
        .catch(e => musicNotFound(`${e.message} from second API`))
}

export {getSimilarTrack}

//missing call getSimilarTrack func ai ApiMusic.js