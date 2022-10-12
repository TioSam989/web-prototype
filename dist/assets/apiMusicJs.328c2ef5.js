import"./sptJs.826e5df3.js";import{g as v,a as $}from"./ApiMusic.7d21743e.js";import{g as S}from"./sptSearchJs.66d1cebf.js";import{g as E}from"./sptSimilarJs.85992db2.js";import"./sptTokenJs.c9a65f70.js";const a=document.querySelector("#musicName");document.querySelector("#artistName");document.querySelector("#searchBtn");const s=document.querySelector("#listResults"),u=b(s),d=b(u),y=document.querySelector("#appMusicRec"),A=k(v,0),R=k(S(1e3)),p={first:"audioscrobbler",second:"musicovery",third:"spotify"};function b(e){return e.parentNode}function k(e,r=1){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{e(...n)},r)}}function L(e,r=!1){let t=document.createElement("option");t.text=`${e.name} from ${e.artist}`,r?(t.value=`${e.trackId} - ${e.artistId} - ${e.market}`,t.setAttribute("id",`${e.trackId}-${e.market}`)):(t.value=`${e.name},${e.artist}`,t.setAttribute("id",`${e.name}-${e.artist}`)),s.appendChild(t)}function j(e){console.error(e)}function i(e){return e.replaceAll(" ","+")}function f(e){e.removeAttribute("hidden","hidden")}function D(e,r,t){if(r==p.first){let n=Object.values(e)[0],o=Object.values(n)[0],l=[];return Object.keys(o).map(function(h){let O={name:o[h].name,artist:o[h].artist.name};l.push(O)}),l}else if(r==p.second)if(t){let n=Object.values(e)[2],o=Object.values(n)[0];Object.keys(o).map(function(l){o[l].title,o[l].artist.name,o[l].id})}else{console.log(e);let n=Object.values(e),o=Object.values(n[2]);return{name:o[1],artist:o[4].name,id:o[0]}}}function I(e,r){let t=[...new Set(e)];for(let n=t.length;n>r;n--)t.shift();if(e==null||!e)throw"list indefinied";return t}function T(e){let r=e.split(""),t=[];for(let n=0;n<r.length;n++)r[n]!=" "&&t.push(r[n]);return t}function M(e){return!(e==null||e==null)}function m(e){if(M(e)==!1)return!1;{let r=[];return r=T(e),r.length!=0}}function q(e){console.log(e),y.innerHTML+=`<p>Listen to ${e.name} from ${e.artist} </p>`}function g(){y.innerHTML=""}async function c(e,r=!1){if(a.value=`${e.name}`,r)try{try{let t=await E(e)}catch(t){console.error(t)}}catch(t){console.error(t)}else try{const t=await $(i(e.name),i(e.artist),5);let n=I(D(t,p.first,5),5);try{if(n.length==0)throw"Music Not Found";g(),n.map(o=>{q(o)})}catch(o){console.error(o),o=="Music Not Found"&&(g(),j())}}catch(t){console.error(t)}}s.addEventListener("change",function(){try{let r=s.value.split(" - ");console.log(`musicMeh: ${r}`);let t={trackId:r[0],artistId:r[1],market:r[2]};c(t,!0)}catch(e){console.error(e);try{console.log("Using option B to select opt on change event");let t=s.value.split(","),n={name:t[0],artist:t[1]};c(n)}catch(r){console.error(r)}}});a.addEventListener("keypress",e=>{if(e.key==="Enter")if(M(a.value)==!1){let r=document.createElement("option");r.text="empty",s.appendChild(r)}else{let t=s[0].value.split(","),n={name:t[0],artist:t[1]};try{c(n,!0)}catch(o){console.error(o);try{console.log("using option B to Select Option on keypress"),c(n)}catch(l){console.error(l)}}}});a.addEventListener("focus",e=>{if(m(a.value)==!0)if(s.childElementCount==0)try{R(a.value).map(t=>{L(t,!0)})}catch(r){console.error(r);try{console.log("using Option B to search on focus"),A(i(a.value),5)}catch(t){console.error(t)}}else f(u)});d.addEventListener("clickout",e=>{});d.addEventListener("mouseover",e=>{m(a.value)==!0&&f(u)});d.addEventListener("mouseout",e=>{});a.addEventListener("input",async e=>{if(m(a.value)!=!1){f(u),s.value="";try{s.innerHTML="",s.value="",console.clear(),(await S(a.value)).map(t=>{L(t,!0)})}catch(r){console.error(r);try{console.log("using option B to Search on input"),v(i(a.value),5)}catch(t){console.error(t)}}}});
