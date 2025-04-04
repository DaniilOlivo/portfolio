class PortfolioGallery {
    constructor(gallery) {
        this.gallery = gallery
        const getEl = (selector) => this.gallery.querySelector(selector)
        this.btnPrev = getEl(".swiper-button-prev")
        this.btnNext = getEl(".swiper-button-next")

        this.modalWrap = document.querySelector(".modal-wrap");
        this.modal = document.querySelector(".modal");
        
        this.swiperWrapper = getEl(".swiper-wrapper");

        this.initHoverNavigate();
        this.initModalImage();
    }

    static initSwiper() {
        return new Swiper('.swiper', {
            loop: true,
            slidesPerView: 'auto',
          
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
        });
    }

    createAnim(btn, borderRadius, side) {
        const tlHover = gsap.timeline({ paused: true });
        tlHover.to(btn, {
            backgroundColor: "#333533",
            color: "#CFDBD5",
            duration: 0.1,
        }).to(btn, {
            borderRadius,
            duration: 0.2
        });

        btn.addEventListener("mouseenter", () => tlHover.play());
        btn.addEventListener("mouseleave", () => tlHover.reverse());

        const animClick = gsap.to(btn, {
            color: "#F5CB5C",
            [`padding${side}`]: 20,
            duration: 0.2,
            paused: true,
            onComplete: () => animClick.reverse()
        });

        btn.addEventListener("click", () => animClick.play());
    }

    initHoverNavigate() {
        this.createAnim(this.btnPrev, "0 50% 50% 0", "Left");
        this.createAnim(this.btnNext, "50% 0 0 50%", "Right");
    }

    initModalImage() {
        this.swiperWrapper.addEventListener("click", (event) => {
            const image = event.target.closest(".gallery-image");
            if (image) {
                this.modal.src = image.src;
                this.modalWrap.classList.add("modal-wrap_show");
            }
        });

        if (!this.modalWrap._hasClickListener) {
            this.modalWrap.addEventListener("click", () => {
                this.modal.src = "";
                this.modalWrap.classList.remove("modal-wrap_show");
            });
            this.modalWrap._hasClickListener = true;
        }
    }
}

function initPortfolio() {
    const swiper = PortfolioGallery.initSwiper()
    const arrGallery = document.querySelectorAll(".gallery")
    arrGallery.forEach(gallery => new PortfolioGallery(gallery))
}

document.addEventListener('DOMContentLoaded', initPortfolio);
