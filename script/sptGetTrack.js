import { sptToken } from './sptToken'

async function getSptApiTrack(musicId) {

    const URL = `https://api.spotify.com/v1/tracks/${musicId}`
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

export { getSptApiTrack }