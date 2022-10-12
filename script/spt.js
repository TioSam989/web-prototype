import {sptToken, tokenData} from './sptToken'
import {getSptApiSearchResults} from './sptSearch'
import {getSptApiSimilarResults} from './sptSimilar'

var input = document.querySelector("#sptInput")
var app = document.querySelector('#sptApp')
input.addEventListener("input", async () => {
    app.innerHTML = ""
    let searchData = await getSptApiSearchResults(input.value)

});

export {getSptApiSearchResults, getSptApiSimilarResults, sptToken, tokenData}