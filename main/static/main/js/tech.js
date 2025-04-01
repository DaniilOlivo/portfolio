function initTech() {
    const selCard = ".card"

    const selShow = ".btn-detail_show"
    const selHide = ".btn-detail_hide"
    const selImage = ".card__image"
    const selContent = ".block-content"

    const selBlockBadges = ".block-badges"
    const selBlockDetail = ".block-detail"

    const arrCards = document.querySelectorAll(selCard)
    arrCards.forEach(card => {
        const blockBadges = card.querySelector(selBlockBadges)
        const blockDetail = card.querySelector(selBlockDetail)
        const image = card.querySelector(selImage)

        const isReverse = card.classList.contains("card_reverse")

        const tl = gsap.timeline()
        tl.to(blockBadges.querySelector(selContent), {
            opacity: 0,
            duration: 0.2
        }).to(blockBadges, {
            width: 0,
            opacity: 0,
            duration: 0.3,
            padding: "40px 0"
        }).to(blockDetail, {
            width: 650,
            opacity: 1,
            duration: 0.3,
            paddingRight: isReverse ? 150 : 40,
            paddingLeft: isReverse ? 40 : 150
        }, "<").to(image, {
            marginLeft: isReverse ? -130 : 0,
            marginRight: isReverse ? 0 : -130,
        }, "<").to(blockDetail.querySelector(selContent), {
            opacity: 1,
            duration: 0.2
        }).pause()

        const btnShow = card.querySelector(selShow)
        btnShow.addEventListener("click", () => tl.play())

        const btnHide = card.querySelector(selHide)
        btnHide.addEventListener("click", () => tl.reverse())

        let mobileOpen = false
        const btnMobile = card.querySelector(".btn-detail-mobile")

        const contentDetail = blockDetail.querySelector(selContent)
        const tlMobile = gsap.timeline()
        tlMobile.to(contentDetail, {
            height: "auto",
            duration: 0.2
        }).to(contentDetail, {
            opacity: 1,
            duration: 0.2
        }).pause()

        btnMobile.addEventListener("click", () => {
            if (mobileOpen) {
                contentDetail.classList.add("block-content_hide")
                tlMobile.reverse()
                mobileOpen = false
            }
            else {
                contentDetail.classList.remove("block-content_hide")
                tlMobile.play()
                mobileOpen = true
            }
        })
    })
}

initTech()
