import {sptToken, tokenData} from './sptToken'
import {getSptApiSearchResults} from './sptSearch'
import {getSptApiSimilarResults} from './sptSimilar'

var input = document.querySelector("#sptInput")
var app = document.querySelector('#sptApp')
input.addEventListener("input", async () => {
    app.innerHTML = ""
    getSptApiSearchResults(input.value)

});