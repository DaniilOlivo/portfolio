let lastScrollY = scrollY

window.onscroll = (e) => {
    let mainBlock = document.querySelector(".main-block")

    if (lastScrollY === 0 && lastScrollY < scrollY) {
        scrollBy({
            behavior: "smooth",
            top: window.innerHeight
        })
    }

    if (lastScrollY > scrollY && scrollY <= window.innerHeight) {
        scrollBy({
            behavior: "smooth",
            top: -window.innerHeight
        })
    }

    lastScrollY = scrollY
}