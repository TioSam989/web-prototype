import { getSptApiSearchResults } from './sptSearch'

var getRandomSongsArray = Array('%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25');

var getRandomSongs = () => getRandomSongsArray[Math.floor(Math.random() * getRandomSongsArray.length)];

var getRandomOffset = () => Math.floor(Math.random() * (1000 - 1 + 1) + 1)

async function getSptApiRandomResults() {

    let arrMusic = await getSptApiSearchResults(`${getRandomSongs()}`, `${getRandomOffset()}`)

    return arrMusic
}

export {getSptApiRandomResults}