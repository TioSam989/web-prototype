class myNavBar extends HTMLElement {
    constructor() {
        super()
        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })

        shadow.appendChild(this.classList())

    }

    createAnchor() {
        const anchor = document.createElement('a')
        anchor.classList.add(`btn btn-ghost normal-case text-x1`)
        
        return anchor

    }

    myNav() {
        const nav = document.createElement('nav')
        nav.classList.add(`ar bg-base-100`)

        return nav
    }
}

customElements.define('my-nav-bar', myNavBar)