import"./sptTokenJs.c9a65f70.js";import{g as r}from"./sptSearchJs.a4b56eb7.js";import"./sptSimilarJs.6d635d55.js";/* empty css                  */var e=document.querySelector("#musicName"),a=document.querySelector("#sptApp");e.addEventListener("input",async()=>{a.innerHTML="";let t=await r(e.value);console.log(t)});