import"./modulepreload-polyfill.c7c6310f.js";const d="0394adacbab6526b446f377465aae302",r=document.querySelector("#musicName"),n=document.querySelector("#artistName"),b=document.querySelector("#searchBtn");function f(e,l,i){const a=`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&track=${l}&artist=${e}&api_key=${d}&limit=${i}&format=json&autocorrect=1`,m={method:"GET",mode:"cors",cache:"default"};console.clear(),console.log(a),fetch(a,m).then(u=>{u.json().then(c=>{let h=Object.values(c)[0],t=Object.values(h)[0];Object.keys(t).forEach(function(o){console.log(t[o]),t[o].name,t[o].artist.name})}).catch(c=>console.log(`i'm broke: ${c.message}`))}).catch()}function s(e){return e.replaceAll(" ","+")}b.addEventListener("click",e=>{console.log(`artist: ${n.value}`),console.log(`music: ${r.value}`),f(s(n.value),s(r.value),"5")});
