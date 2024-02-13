const CLS_SLIDE_ACTIVE = "slide_active"


const CLS_MODAL_ACTIVE = "modal_active"

function createSlideShow(slideshow) {
    const slides = slideshow.querySelectorAll(".slide")
    return {
        slides,
        COUNT_SLIDES: slides.length,
        currentSlideIndex: 0,

        displaySlide(slideIndex) {
            this.slides[this.currentSlideIndex].classList.remove(CLS_SLIDE_ACTIVE)
            this.slides[slideIndex].classList.add(CLS_SLIDE_ACTIVE)

            this.currentSlideIndex = slideIndex
        },

        shiftSlide(direct) {
            let newIndex = this.currentSlideIndex + direct
            if (newIndex >= this.COUNT_SLIDES) newIndex = 0
            if (newIndex < 0) newIndex = this.COUNT_SLIDES - 1
            this.displaySlide(newIndex)
        },
        timer: {
            id: null,
            interval: 10000,
        },
        setupTimer() {
            this.timer.id = setInterval(
                () => this.shiftSlide(+1),
                this.timer.interval
            )
        },
        resetTimer() {
            clearInterval(this.timer.id)
            this.setupTimer()
        }
    }
}

function initSlideShows() {
    const slideshows = document.querySelectorAll(".slideshow")
    const modal = document.querySelector(".modal")
    const modalContent = modal.querySelector(".modal__content")

    for (const slideshow of slideshows) {
        const slideshowObj = createSlideShow(slideshow)
        slideshowObj.setupTimer()

        for (const slide of slideshowObj.slides) {
            slide.addEventListener("click", (e) => {
                e.stopPropagation()
                modalContent.innerHTML = ""
                modalContent.append(slide.cloneNode())
                modal.classList.add(CLS_MODAL_ACTIVE)
            })
        } 

        const btnPrev = slideshow.querySelector(".slideshow-btn_prev")
        const btnNext = slideshow.querySelector(".slideshow-btn_next")

        btnPrev.addEventListener("click", (e) => {
            e.stopPropagation()
            slideshowObj.shiftSlide(-1)
            slideshowObj.resetTimer()
        })
        btnNext.addEventListener("click", (e) => {
            e.stopPropagation()
            slideshowObj.shiftSlide(+1)
            slideshowObj.resetTimer()
        })

        slideshowObj.displaySlide(0)
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modalContent.innerHTML = ""
            modal.classList.remove(CLS_MODAL_ACTIVE)
        }
    })
}

initSlideShows()
