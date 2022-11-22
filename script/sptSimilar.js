import { sptToken, tokenData } from "./sptToken"

function prepareStrToUrl(str){
    return str.toString().replace(/\s/g, '+');
}

function marketConfig(mrkt){
    if(mrkt.length > 2){

            return 'ES'

    }else{
        return mrkt
    }
}

async function getSimilar(musicObj) {
    const URL = `https://api.spotify.com/v1/recommendations?limit=10&market=${marketConfig(prepareStrToUrl(musicObj.market))}&seed_artists=${prepareStrToUrl(musicObj.artistId)}&seed_genres=any%2Ccountry&seed_tracks=${prepareStrToUrl(musicObj.trackId)}`
    return await fetch(`${URL}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${await sptToken()}`
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

    return data
    //browser in obj

}

export {getSptApiSimilarResults}