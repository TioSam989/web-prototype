import { sptToken } from './sptToken'

async function searchTrack(q, offset=5, limit=5) {
    try {

        const URL = `https://api.spotify.com/v1/search?q=${q}&offset=${offset}&type=track&limit=${limit}`
        const options = {
            method: 'GET',
            mode: 'no-cors',
            timeout: 1000
        }

        return await fetch(`${URL}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${await sptToken()}`
            },
        })
            .then(res => {
                return res.json()
                    .then(data => {
                        return data
                    })
            })



    } catch (err) {
        console.error(err)
    }
}

async function getSptApiSearchResults(musicName, offset=5, limit=5) {

    var data = await searchTrack(musicName, offset, limit)
    let bfrTrk = Object.values(data)
    let bfrtrk2 = Object.values(bfrTrk)[0]
    let crrTrack = Object.values(bfrtrk2)[1]
    

    let arrMusic = []

    Object.keys(crrTrack).forEach(function (keys) {

        let crrSng = {
            trackId: crrTrack[keys].id,
            name: crrTrack[keys].name,
            artist: artists(crrTrack[keys].artists, 'name'),
            artistId: artists(crrTrack[keys].artists, 'id'),
            artists: crrTrack[keys].artists,
            market: crrTrack[keys].available_markets[0],
            musicData: crrTrack[keys]
        }



        arrMusic.push(crrSng)
        
    });
    
    return arrMusic
}

function artists(obje, whatIsBeingReceived) {

    if (whatIsBeingReceived == 'name') {

        if (obje.length == 1) {
            return obje[0].name
        } else if (obje.length > 1) {
            let arr = []
            for (let index = 0; index < obje.length; index++) {
                arr.push(obje[index].name)
            }
            arr.join(", ")
            return arr
        }
    } else if (whatIsBeingReceived == 'id') {

        if (obje.length == 1) {
            return obje[0].id
        } else if (obje.length > 1) {
            let arr = []
            for (let index = 0; index < obje.length; index++) {
                arr.push(obje[index].id)
            }
            return arr
        }
    }
}

export {getSptApiSearchResults, searchTrack, artists}
