import {sptToken, tokenData} from './sptToken'
import {getSptApiSearchResults} from './sptSearch'
import {getSptApiSimilarResults} from './sptSimilar'
import {getSptApiRandomResults} from './sptRandom'


import "../style/output.css"

var input = document.querySelector("#musicName")
var app = document.querySelector('#sptApp')
input.addEventListener("input", async () => {
    app.innerHTML = ""
    if(input.value.replace(/\s/g, '') != ""){
        let searchData = await getSptApiSearchResults(input.value)
        console.log(searchData)
    }
});

input.addEventListener("keypress", async (e) => {
    
    if(e.key == 'Enter'){
        console.log('enter clicked, gimme some bealty results')
    }
    
});

export {getSptApiSearchResults, getSptApiSimilarResults, sptToken, tokenData}