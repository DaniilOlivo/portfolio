function initGallery() {
    const swiper = new Swiper('.swiper', {
        loop: true,
      
        pagination: {
          el: '.swiper-pagination',
        },
      
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    
        autoplay: {
            delay: 5000,
        },

        speed: 500,
    
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
    })
}

function hoverNavigate() {
    const createAnim = (selector, borderRadius, side) => {
        const arrEls = document.querySelectorAll(selector)
        arrEls.forEach((el) => {
            const tlHover = gsap.timeline();
            tlHover.to(el, {
                backgroundColor: "#333533",
                color: "#CFDBD5",
                duration: 0.1,
            }).to(el, {
                borderRadius,
                duration: 0.2
            })
            tlHover.pause()

            el.addEventListener("mouseenter", () => tlHover.play())
            el.addEventListener("mouseleave", () => tlHover.reverse())

            const animClick = gsap.to(el, {
                color: "#F5CB5C",
                ["padding" + side]: 20,
                duration: 0.2,
                paused: true,
                onComplete: () => animClick.reverse()
            })
    
            el.addEventListener("click", () => animClick.play())
        })        
    }  

    createAnim(".swiper-button-prev", "0 50% 50% 0", "Left")
    createAnim(".swiper-button-next", "50% 0 0 50%", "Right")
}

function modalImage() {
    const modalWrap = document.querySelector(".modal-wrap")
    const modal = document.querySelector(".modal")

    const images = document.querySelectorAll(".gallery-image")
    images.forEach(image => {
        image.addEventListener("click", () => {
            modal.src = image.src
            modalWrap.classList.add("modal-wrap_show")
        })
    })

    modalWrap.addEventListener("click", () => {
        modal.src = ""
        modalWrap.classList.remove("modal-wrap_show")
    })
}

function initPortfolio() {
    initGallery()
    hoverNavigate()
    modalImage()
}

initPortfolio()
