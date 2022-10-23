import {sptToken, tokenData} from './sptToken'
import {getSptApiSearchResults} from './sptSearch'
import {getSptApiSimilarResults} from './sptSimilar'


import "../style/output.css"

var input = document.querySelector("#musicName")
var app = document.querySelector('#sptApp')
input.addEventListener("input", async () => {
    app.innerHTML = ""
    let searchData = await getSptApiSearchResults(input.value)
    console.log(searchData)
});

export {getSptApiSearchResults, getSptApiSimilarResults, sptToken, tokenData}