import"./sptJs.fc669d6c.js";import{g as S,a as $}from"./ApiMusic.4513811d.js";import{g as b}from"./sptSearchJs.a4b56eb7.js";import{g as A}from"./sptSimilarJs.6d635d55.js";import"./sptTokenJs.c9a65f70.js";/* empty css                  */const a=document.querySelector("#musicName");document.querySelector("#artistName");document.querySelector("#searchBtn");const i=document.querySelector("#listResults"),l=k(i),d=k(l),y=document.querySelector("#appMusicRec"),O=L(S,0),R=L(b(1e3)),u={first:"audioscrobbler",second:"musicovery",third:"spotify"};function k(e){return e.parentNode}function L(e,r=1){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{e(...n)},r)}}function E(e,r){i.innerHTML="";let t=[...new Set(e)];for(let n=t.length;n>r;n--)t.shift();return t}function f(e,r=!1){let t=document.createElement("option");t.text=`${e.name} from ${e.artist}`,r?(t.value=`${e.trackId} - ${e.artistId} - ${e.market}`,t.setAttribute("id",`${e.trackId}-${e.market}`)):(t.value=`${e.name},${e.artist}`,t.setAttribute("id",`${e.name}-${e.artist}`)),i.appendChild(t)}function T(e){console.error(e)}function c(e){return e.replaceAll(" ","+")}function p(e){e.removeAttribute("hidden","hidden")}function j(e,r,t){if(r==u.first){let n=Object.values(e)[0],o=Object.values(n)[0],s=[];return Object.keys(o).map(function(h){let M={name:o[h].name,artist:o[h].artist.name};s.push(M)}),s}else if(r==u.second)if(t){let n=Object.values(e)[2],o=Object.values(n)[0];Object.keys(o).map(function(s){o[s].title,o[s].artist.name,o[s].id})}else{let n=Object.values(e),o=Object.values(n[2]);return{name:o[1],artist:o[4].name,id:o[0]}}}function D(e,r){let t=[...new Set(e)];for(let n=t.length;n>r;n--)t.shift();if(e==null||!e)throw"list indefinied";return t}function I(e){let r=e.split(""),t=[];for(let n=0;n<r.length;n++)r[n]!=" "&&t.push(r[n]);return t}function q(e){return!(e==null||e==null)}function m(e){if(q(e)==!1)return!1;{let r=[];return r=I(e),r.length!=0}}function w(e){y.innerHTML+=`<p>Listen to ${e.name} from ${e.artist} </p>`}function g(){y.innerHTML=""}async function v(e,r=!1){if(a.value=`${e.name}`,r)try{try{let t=await A(e)}catch(t){console.error(t)}}catch(t){console.error(t)}else try{const t=await $(c(e.name),c(e.artist),5);let n=D(j(t,u.first,5),5);try{if(n.length==0)throw"Music Not Found";g(),n.map(o=>{w(o)})}catch(o){console.error(o),o=="Music Not Found"&&(g(),T())}}catch(t){console.error(t)}}i.addEventListener("change",function(){try{let r=i.value.split(" - "),t={trackId:r[0],artistId:r[1],market:r[2]};v(t,!0)}catch(e){console.error(e);try{console.log("Using option B to select opt on change event");let t=i.value.split(","),n={name:t[0],artist:t[1]};v(n)}catch(r){console.error(r)}}});a.addEventListener("focus",e=>{if(m(a.value)==!0)if(i.childElementCount==0)try{R(a.value).map(t=>{f(t,!0)})}catch(r){console.error(r);try{console.log("using Option B to search on focus"),O(c(a.value),5)}catch(t){console.error(t)}}else p(l)});d.addEventListener("clickout",e=>{});d.addEventListener("mouseover",e=>{m(a.value)==!0&&p(l)});d.addEventListener("mouseout",e=>{});a.addEventListener("input",async e=>{if(m(a.value)!=!1){p(l),i.value="";try{i.innerHTML="",i.value="",(await b(a.value)).map(t=>f(t,!0))}catch(r){console.error(r);try{console.log("using option B to Search on input");let t=await S(c(a.value),5);E(t,limit).map(n=>f(n))}catch(t){console.error(t)}}}});