function animateCat() {
    const selCat = ".cat"
    const selPaw = ".paw"
    const selPhone = ".phone-ico"

    let isPhoneFall = false
    let isPhoneFellForever = false
    let countFall = 0
    let cursorHover = false

    const tlInit = gsap.timeline()
    tlInit.to(selCat, {
        top: 0,
        duration: 1,
        ease: "sine.in"
    }).to(selPaw, {
        delay: 1,
        height: 32,
        onComplete: () => tlPaw.play()
    })

    const tlFallForever = gsap.timeline()
    tlFallForever.to(selPhone, {
        delay: 0.5,
        duration: 1,
        y: "60vh",
        ease: "power4.in"
    }).to(selPaw, {
        height: 0
    }).to(selCat, {
        top: 30,
        onComplete: () => document.querySelector(selPhone).style.display = "none"
    }).pause()


    const tlPaw = gsap.timeline()
    tlPaw.to(selPaw, {
        delay: 1,
        ease: "circ.in",
        height: 50
    }).to(selPhone, {
        rotation: -45,
        duration:1.5,
        ease: "expo.in",
        onComplete: () => {
            isPhoneFall = true
            if (countFall >= 5) {
                isPhoneFellForever = true
                tlFallForever.play()
            }
            countFall += 1
            animBackPhone.restart()
            animBackPhone.pause()
        }
    }).to(selPaw, {
        height: 32,
        ease: "circ.out"
    }, "<")
    tlPaw.pause()

    const animBackPhone = gsap.to(selPhone, {
        paused: true,
        rotation: 0,
        onComplete: () => {
            isPhoneFall = false
            if (!cursorHover) tlPaw.restart()
        }
    })

    let icoPhone = document.querySelector(selPhone)
    icoPhone.addEventListener("mouseenter", () => {
        cursorHover = true
        if (isPhoneFall && !isPhoneFellForever) animBackPhone.play()
    })
    icoPhone.addEventListener("mouseleave", () => {
        cursorHover = false
        if (!isPhoneFall)
            tlPaw.restart()
    })
}

function initContacts() {
    animateCat()
}

initContacts()
