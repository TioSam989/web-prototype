import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase.js"


onAuthStateChanged(auth, user => {
    if (user) {
        localStorage.setItem('myUser', JSON.stringify(user))     
    } else {
        console.log(null)
    }
})

let crrUser = localStorage.getItem('crrUser')

let isLogged = () => {

    if (crrUser) {
        return true
    } else {
        return false
    }
}

function separeteClasses(classesMeh) {
    let list = classesMeh.split(" ")

    return list
}

function checkifIndex() {
    const dawg = document.querySelector('#indexMeh')

    if (dawg) {
        return true
    } else {
        false
    }
}

class myNavBar extends HTMLElement {
    constructor() {
        super()
        console.log()
        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })

        const nav = this.myNav()
        const navIndexBtn = this.createAnchor()

        const subNavPr = this.subNavPrimary()
        const daddyDiv = this.createDivDaddy()
        const inputMeh = this.inputPlace()
        const profile = this.createDivProfile(JSON.parse(crrUser).displayName, JSON.parse(crrUser).photoURL)


        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        if (checkifIndex()) {
            link.setAttribute('href', './style/output.css'); //to index
        } else {
            link.setAttribute('href', '../style/output.css'); //to index
        }

        subNavPr.appendChild(navIndexBtn)

        daddyDiv.appendChild(inputMeh)
        daddyDiv.appendChild(profile)


        nav.appendChild(subNavPr)
        nav.appendChild(daddyDiv)

        shadow.appendChild(link)
        shadow.appendChild(nav)
    }

    mySubDiv() {
        const subDiv = document.createElement('div')
        subDiv.classList.add('flex-1')

        return subDiv
    }

    profileBtn() {
        const profile = document.createElement('ul')
        profile.setAttribute('tabindex', '0')   
        profile.classList.add(...separeteClasses(`mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52`).map(element => element))

        const subprof = document.createElement('li')

        const profileAnchor = document.createElement('a')
        profileAnchor.classList.add('justify-between')
        profileAnchor.innerHTML = 'Profile'

        const settingsAnchor = document.createElement('a')
        settingsAnchor.innerHTML = 'Settings'

        const LogoutAnchor = document.createElement('a')
        LogoutAnchor.innerHTML = 'Logout'

        subprof.appendChild(LogoutAnchor)
        profile.appendChild(subprof)
        subprof.appendChild(settingsAnchor)
        profile.appendChild(subprof)
        subprof.appendChild(profileAnchor)
        profile.appendChild(subprof)

        return profile

    }

    createBtns() {
        const createBtn = (_, id) => {
            const btn = document.createElement('button')
            btn.setAttribute('data-value', Number(id) + 1)
            btn.innerHTML = `Meh ${Number(id) + 1}`

            return btn
        }

        return Array.from({ length: 3 }, createBtn)
    }

    createDivProfile(userName, userProfile) {
        const divMeh = document.createElement('div')
        divMeh.classList.add(...separeteClasses('dropdown dropdown-end').map(element => element))

        const labelMeh = document.createElement('label')
        labelMeh.classList.add(...separeteClasses('btn btn-ghost btn-circle avatar').map(element => element))
        labelMeh.setAttribute('tabindex', '0')

        const subDivMeh = document.createElement('div')
        subDivMeh.classList.add(...separeteClasses('w-10 rounded-full').map(element => element))
        subDivMeh.setAttribute('title',`${userName}`)

        const imgMeh = document.createElement('img')
        imgMeh.setAttribute('src', `${userProfile}`)

        const ulDown = document.createElement('ul')
        ulDown.setAttribute('tabindex', '0')   
        ulDown.classList.add(...separeteClasses('mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52').map(element => element))

        const liMehProfile = document.createElement('li')
        liMehProfile.innerHTML = '<a>Profile</a>'

        const liAnchor = document.createElement('a')
        liAnchor.classList.add('justify-between')
        liAnchor.innerHTML = 'Profile'

        const liSet = document.createElement('li')
        liSet.innerHTML = '<a>Settings</a>'

        const liSetAnchor = document.createElement('a')
        liSetAnchor.innerHTML = 'Settings'

        const liLout = document.createElement('li')
        liLout.innerHTML = '<a>Logout</a>'

        const liLoutAnchor = document.createAttribute('a')
        liLoutAnchor.innerHTML = 'Logout'

        // liLout.appendChild(liLoutAnchor)
        // liSet.appendChild(liSetAnchor)
        // liMehProfile.appendChild(liAnchor)

        ulDown.appendChild(liMehProfile)
        ulDown.appendChild(liSet)
        ulDown.appendChild(liLout)

        subDivMeh.appendChild(imgMeh)
        labelMeh.appendChild(subDivMeh)

        divMeh.appendChild(labelMeh)
        divMeh.appendChild(ulDown)

        return divMeh

    }

    inputPlace() {

        let anotherOne = document.createElement('div')
        anotherOne.classList.add('form-control')

        let inputMeh = document.createElement('input')
        inputMeh.classList.add(...separeteClasses('input input-bordered').map(element => element))
        inputMeh.setAttribute('type', 'text')
        inputMeh.setAttribute('placeholder', 'search')

        anotherOne.appendChild(inputMeh)

        return anotherOne

    }

    createDivDaddy() {
        let subDamn = document.createElement('div')
        subDamn.classList.add(...separeteClasses(`flex-none gap-2`).map(element => element))

        return subDamn
    }

    createAnchor() {
        const anchor = document.createElement('a')
        anchor.innerHTML = 'MusicFinder'
        anchor.setAttribute('href', './index.html')
        anchor.classList.add(...separeteClasses(`text-xl btn btn-ghost btn-ghost normal-case`).map(element => element))

        return anchor
    }

    subNavPrimary() {
        const sub = document.createElement('div')
        sub.classList.add('flex-1')

        return sub

    }

    myNav() {
        const nav = document.createElement('div')
        nav.classList.add(...separeteClasses(`navbar bg-base-100`).map(element => element))

        return nav
    }
}

export { myNavBar }

//in another file, import using impoty {myNavBar} from "./this directory.js"