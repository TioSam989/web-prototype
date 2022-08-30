// https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=SystemOfADown&track=BYOB&api_key=0394adacbab6526b446f377465aae302&limit=10
const API_key = "0394adacbab6526b446f377465aae302"
const ownName =  "tiosamna"

fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data))