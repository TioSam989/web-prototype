import"./modulepreload-polyfill.c7c6310f.js";const o=document.querySelector("#musicName");document.querySelector("#artistName");document.querySelector("#searchBtn");async function h(e,c){const t=`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${e}&api_key=0394adacbab6526b446f377465aae302&format=json&limit=${c}`;await fetch(t,{method:"get",mode:"cors",cache:"default",timeout:1e3}).then(s=>{s.json().then(l=>{let u=Object.values(l)[0],i=Object.values(u)[4],a=Object.values(i)[0],r=[];Object.keys(a).forEach(function(n){let m={name:a[n].name,artist:a[n].artist};r.push(m),f(r,c)})})})}function f(e,c){console.clear();for(let t=e.length;t>c;t--)musicList.shift();e.forEach(t=>d(t))}function d(e){console.log(e)}function p(e){return e.replaceAll(" ","+")}o.addEventListener("input",e=>{console.clear(),o.value==""||o.value==null?console.log("empty"):(console.log("changed"),h(p(o.value),5))});
