import{o as c,f as n,a as s}from"./firebase.e95a7973.js";c(s,r=>{r?redirectTo("../index.html"):console.log(r)});submitDataSignUp.addEventListener("click",r=>{var t=document.querySelector("#email").value,o=document.querySelector("#password").value,l=document.querySelector("#username").value;n(s,t,o).then(a=>{var e=a.user;e.email=t,e.displayName=l,redirectTo("../index.html"),console.log(e)}).catch(a=>{a.code;const e=a.message;alert(e)})});