import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth } from "../../firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("crrUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("crrUser");
  }
});

let crrUser = localStorage.getItem("crrUser");

let isLogged = () => {
  if (crrUser) {
    return true;
  } else {
    return false;
  }
};

function separeteClasses(classesMeh) {
  let list = classesMeh.split(" ");

  return list;
}

function checkifIndex() {
  const dawg = document.querySelector("#indexMeh");

  if (dawg) {
    return true;
  } else {
    false;
  }
}

class myNavBar extends HTMLElement {
  constructor() {
    super();
    if (isLogged()) {
      this.build(JSON.parse(crrUser));
    } else {
      this.build()
    }
  }

  build(userData) {
    const shadow = this.attachShadow({ mode: "open" });

    const nav = this.myNav();
    const navIndexBtn = this.createAnchor();

    const subNavPr = this.subNavPrimary();
    const daddyDiv = this.createDivDaddy();
    const inputMeh = this.inputPlace();
    const fontawesomeKit = this.fontAw();

    const styleContent = document.querySelector('#fknStyleToMfNavBar').innerHTML

    this.shadowRoot.innerHTML += styleContent


    let profile
    if (isLogged()) {
      profile = this.createDivProfile(
        userData.displayName,
        userData.photoURL
      );

    } else {
      if (checkifIndex()) {

        profile = this.createLogs('./pages/signIn.html', './pages/signUp.html')

      } else {
        profile = this.createLogs('./signIn.html', './signUp.html')

      }
    }

    const navbarStart = this.navBarStart();
    const navBarMid = this.navbarMIddle();
    const navBarEnd = this.navBarEnd();

    let link = document.createElement("link");
    let script = document.createElement("script");

    link.setAttribute("rel", "stylesheet");
    script.setAttribute("type", "module");
    if (checkifIndex()) {
      link.setAttribute("href", "./style/output.css"); //to index
      link.setAttribute("src", "./script/functions.js"); //to index
    } else {
      link.setAttribute("href", "../style/output.css"); //to index
      link.setAttribute("src", "../script/functions.js"); //to index
    }

    navbarStart.appendChild(subNavPr);
    subNavPr.appendChild(navIndexBtn);

    navBarEnd.appendChild(daddyDiv);
    daddyDiv.appendChild(profile);

    nav.appendChild(navbarStart);
    nav.appendChild(navBarMid);
    nav.appendChild(navBarEnd);

    shadow.appendChild(script);
    // shadow.appendChild(link);
    shadow.appendChild(fontawesomeKit)
    shadow.appendChild(nav);
  }

  fontAw() {
    const scrpt = document.createElement('script')
    scrpt.setAttribute("src", "https://kit.fontawesome.com/6a4613757d.js")
    scrpt.setAttribute("crossorigin", "anonymous")

    return scrpt
  }

  createLogs(SignIn, signUp) {

    const divMeh = document.createElement('div')
    // divMeh.innerHTML = '<a href=`` style="textDecoration: `inherit`, color: `inherit`, cursor: `auto`"><button class="btn btn-ghost">Sign In</button></a>'
    // divMeh.innerHTML += '<a href=`` style="textDecoration: `inherit`, color: `inherit`, cursor: `auto`"><button class="btn btn-primary">Sign Up</button></a>'

    const anchorF = document.createElement('a')
    anchorF.setAttribute('style', 'style="textDecoration: "inherit", color: "inherit", cursor: "auto" " ')
    anchorF.setAttribute('href', `${SignIn} `)

    const anchorS = document.createElement('a')
    anchorS.setAttribute('style', 'style="textDecoration: "inherit", color: "inherit", cursor: "auto" " ')
    anchorS.setAttribute('href', `${signUp} `)

    const btnIn = document.createElement('button')
    btnIn.classList.add(...separeteClasses('btn btn-ghost').map(element => element))
    btnIn.innerHTML = 'Sign In'

    const btnUp = document.createElement('button')
    btnUp.classList.add(...separeteClasses('btn btn-primary').map(element => element))
    btnUp.innerHTML = 'Sign Up'

    anchorF.appendChild(btnIn)
    anchorS.appendChild(btnUp)

    divMeh.appendChild(anchorF)
    divMeh.appendChild(anchorS)

    return divMeh

  }

  navbarMIddle() {
    const myDiv = document.createElement("div");
    myDiv.classList.add("navbar-center");

    return myDiv;
  }

  darkOrLight() {
    const mainLab = document.createElement("label");
    mainLab.classList.add(
      ...separeteClasses("swap swap-rotate").map((element) => element)
    );

    const inpt = document.createElement("input");
    inpt.setAttribute("type", "checkbox");

    const firstSvg = document.createElement("svg");
    firstSvg.classList.add(
      ...separeteClasses("swap-on fill-current w-10 h-10").map(
        (element) => element
      )
    );
    firstSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    firstSvg.setAttribute("viewBox", "0 0 24 24");

    firstSvg.innerHTML =
      '<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>';

    const PathSvgF = document.createElement("path");
    PathSvgF.setAttribute(
      "d",
      'M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>'
    );

    const secondSvg = document.createElement("svg");
    secondSvg.classList.add(
      ...separeteClasses("swap-off fill-current w-10 h-10").map(
        (element) => element
      )
    );
    secondSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    secondSvg.setAttribute("viewBox", "0 0 24 24");

    secondSvg.innerHTML =
      '<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>';

    const PathSvgS = document.createElement("path");
    PathSvgS.setAttribute(
      "d",
      'M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>'
    );

    mainLab.innerHTML =
      '<input type="checkbox"><svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z&quot;/></svg>"></path></svg><svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z&quot;/></svg>"></path></svg>';

    // mainLab.appendChild(inpt)
    // mainLab.appendChild(firstSvg)
    // mainLab.appendChild(secondSvg)

    return mainLab;
  }

  mySubDiv() {
    const subDiv = document.createElement("div");
    subDiv.classList.add("flex-1");

    return subDiv;
  }

  profileBtn() {
    const profile = document.createElement("ul");
    profile.setAttribute("tabindex", "0");
    profile.classList.add(
      ...separeteClasses(
        `mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52`
      ).map((element) => element)
    );

    const subprof = document.createElement("li");

    const profileAnchor = document.createElement("a");
    profileAnchor.classList.add("justify-between");
    profileAnchor.innerHTML = "Profile";

    const settingsAnchor = document.createElement("a");
    settingsAnchor.innerHTML = "Theme";

    const LogoutAnchor = document.createElement("a");

    subprof.appendChild(LogoutAnchor);
    profile.appendChild(subprof);
    subprof.appendChild(settingsAnchor);
    profile.appendChild(subprof);
    subprof.appendChild(profileAnchor);
    profile.appendChild(subprof);

    return profile;
  }

  createBtns() {
    const createBtn = (_, id) => {
      const btn = document.createElement("button");
      btn.setAttribute("data-value", Number(id) + 1);
      btn.innerHTML = `Meh ${Number(id) + 1}`;

      return btn;
    };

    return Array.from({ length: 3 }, createBtn);
  }

  createDivProfile(userName, userProfile) {
    const divMeh = document.createElement("div");
    divMeh.classList.add(
      ...separeteClasses("dropdown dropdown-end").map((element) => element)
    );

    const labelMeh = document.createElement("label");
    labelMeh.classList.add(
      ...separeteClasses("btn btn-ghost btn-circle avatar").map(
        (element) => element
      )
    );
    labelMeh.setAttribute("tabindex", "0");

    const subDivMeh = document.createElement("div");
    subDivMeh.classList.add(
      ...separeteClasses(
        "w-10 ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full"
      ).map((element) => element)
    );
    subDivMeh.setAttribute("title", `${userName}`);

    const imgMeh = document.createElement("img");
    imgMeh.setAttribute("src", `${userProfile}`);

    const ulDown = document.createElement("ul");
    ulDown.setAttribute("tabindex", "0");
    ulDown.classList.add(
      ...separeteClasses(
        "mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      ).map((element) => element)
    );

    const liMehProfile = document.createElement("li");
    liMehProfile.innerHTML = "<a>Profile</a>";

    const liAnchor = document.createElement("a");
    liAnchor.classList.add("justify-between");
    
    liAnchor.innerHTML = "Profile" ;

    const liSet = document.createElement("li");
    liSet.innerHTML = "<a>Theme</a>";

    const liSetAnchor = document.createElement("a");
    liSetAnchor.innerHTML = "Theme";

    const liLout = document.createElement("li");
    liLout.setAttribute("id", "logOutApp");
    liLout.innerHTML = `<a class="text-red-500" id="LogOutBtn" >Logout </a>`;

    const liLoutAnchor = document.createAttribute("a");
    liLoutAnchor.innerHTML = "Logout";

    // liLout.appendChild(liLoutAnchor)
    // liSet.appendChild(liSetAnchor)
    // liMehProfile.appendChild(liAnchor)

    ulDown.appendChild(liMehProfile);
    ulDown.appendChild(liSet);
    ulDown.appendChild(liLout);

    subDivMeh.appendChild(imgMeh);
    labelMeh.appendChild(subDivMeh);

    divMeh.appendChild(labelMeh);
    divMeh.appendChild(ulDown);

    return divMeh;
  }

  inputPlace() {
    let anotherOne = document.createElement("div");
    anotherOne.classList.add("form-control");

    let inputMeh = document.createElement("input");
    inputMeh.classList.add(
      ...separeteClasses("input input-bordered").map((element) => element)
    );
    inputMeh.setAttribute("type", "text");
    inputMeh.setAttribute("placeholder", "search");

    anotherOne.appendChild(inputMeh);

    return anotherOne;
  }

  createDivDaddy() {
    let subDamn = document.createElement("div");
    subDamn.classList.add(
      ...separeteClasses(`flex-none gap-2`).map((element) => element)
    );

    return subDamn;
  }

  createAnchor() {
    const anchor = document.createElement("a");
    anchor.innerHTML = `<span class="text-primary">M</span>usic <span class="text-primary">F</span>inder`;
    anchor.setAttribute("href", "./index.html");
    anchor.classList.add(
      ...separeteClasses(`text-xl btn btn-ghost btn-ghost normal-case`).map(
        (element) => element
      )
    );

    return anchor;
  }

  subNavPrimary() {
    const sub = document.createElement("div");
    sub.classList.add("flex-1");

    return sub;
  }

  navBarStart() {
    const navStr = document.createElement("div");
    navStr.classList.add("navbar-start");

    return navStr;
  }

  navBarEnd() {
    const navEnd = document.createElement("div");
    navEnd.classList.add("navbar-end");

    return navEnd;
  }

  myNav() {
    //try to put clur effect
    const nav = document.createElement("div");
    nav.classList.add(
      ...separeteClasses(`navbar bg-base-500`).map((element) => element)
    );

    return nav;
  }

}

export { myNavBar, separeteClasses }

//in another file, import using impoty {myNavBar} from "./this directory.js"
