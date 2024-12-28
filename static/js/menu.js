function initMenu() {
    let currentPage = document.querySelector(".top-menu__select").textContent
    let btnsMenu = document.querySelectorAll(".top-menu__btn")
    btnsMenu.forEach(btn => {
        if (btn.id == currentPage) {
            btn.classList.add("top-menu__btn_active")
            let bookmark = document.createElement("img")
            bookmark.setAttribute("src", "/static/img/bookmark.png")
            bookmark.classList.add("top-menu__btn_bookmark")
            btn.append(bookmark)
        }
    })
}

function initAnimate() {
    gsap.to(".top-menu__btn_bookmark", {
        height: 76,
        duration: 1,
        delay: 0.3,
        ease: "expo.out"
    })
}

function hoverGithub() {
    let stopAnim = false

    const anim = gsap.to(".github-ico", {
        rotation: 360,
        duration: 1,
        repeat: -1,
        paused: true,
        ease: "power.inOut",
        onRepeat: () => {
            if (stopAnim) {
                anim.restart()
                anim.pause()
                stopAnim = false
            }
        }
    })

    const el = document.querySelector(".github-ico")
    if (!el) return
    el.addEventListener("mouseenter", () => anim.play())
    el.addEventListener("mouseleave", () => stopAnim = true)
}
 
function init() {
    initMenu()
    initAnimate()
    hoverGithub()
}

init()
