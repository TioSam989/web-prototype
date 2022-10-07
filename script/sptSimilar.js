import { sptToken, tokenData } from "./sptToken"

async function getSimilar(musicObj) {
    const URL = `https://api.spotify.com/v1/recommendations?limit=10&market=anyES&seed_artists=${musicObj.artistId}&seed_genres=any%2Ccountry&seed_tracks=${musicObj.trackId}`

    return await fetch(`${URL}`, {
        method: 'GET',
        headers: {
            "authorizarion": `Bearer ${await sptToken()}`
        }
    })
    .then(res => {
        return res.json()
            .then(data => {
                return data
            })
    })

}

async function getSptApiSimilarResults(obje) {
    let data = await getSimilar(obje)

    console.log(data)

    //browser in obj

}

export {getSptApiSimilarResults}