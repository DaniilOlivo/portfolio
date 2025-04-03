class TechCard {
    constructor(cardElement) {
        this.card = cardElement;
        this.blockBadges = this.card.querySelector('.block-badges');
        this.blockDetail = this.card.querySelector('.block-detail');
        this.image = this.card.querySelector('.card__image');
        this.btnShow = this.card.querySelector('.btn-detail_show');
        this.btnHide = this.card.querySelector('.btn-detail_hide');
        this.btnMobile = this.card.querySelector('.btn-detail-mobile');
        
        this.isReverse = this.card.classList.contains('card_reverse');
        this.mobileOpen = false;
        
        this.initDesktopAnimation();
        this.initMobileInteraction();
    }
    
    initDesktopAnimation() {
        const contentBadges = this.blockBadges.querySelector('.block-content');
        const contentDetail = this.blockDetail.querySelector('.block-content');
        
        this.desktopTimeline = gsap.timeline({ paused: true });
        this.desktopTimeline
            .to(contentBadges, {
                opacity: 0,
                duration: 0.2
            })
            .to(this.blockBadges, {
                width: 0,
                opacity: 0,
                duration: 0.3,
                padding: "40px 0"
            })
            .to(this.blockDetail, {
                width: 650,
                opacity: 1,
                duration: 0.3,
                paddingRight: this.isReverse ? 150 : 40,
                paddingLeft: this.isReverse ? 40 : 150
            }, "<")
            .to(this.image, {
                marginLeft: this.isReverse ? -130 : 0,
                marginRight: this.isReverse ? 0 : -130,
            }, "<")
            .to(contentDetail, {
                opacity: 1,
                duration: 0.2
            });
        
        this.btnShow.addEventListener('click', () => this.desktopTimeline.play());
        this.btnHide.addEventListener('click', () => this.desktopTimeline.reverse());
    }
    
    initMobileInteraction() {
        const contentDetail = this.blockDetail.querySelector('.block-content');
        const circleBtn = this.btnMobile.querySelector(".btn-detail-mobile__circle")
        
        this.mobileTimeline = gsap.timeline({ paused: true });
        this.mobileTimeline
            .to(contentDetail, {
                height: "auto",
                duration: 0.2
            })
            .to(this.blockDetail, {
                paddingTop: "1em",
                duration: 0.2,
            }, "<")
            .to(circleBtn, {
                rotate: "180deg",
                duration: 0.4,
            }, "<")
            .to(contentDetail, {
                opacity: 1,
                duration: 0.2
            });
        
        this.btnMobile.addEventListener('click', () => {
            this.mobileOpen = !this.mobileOpen;
            
            if (this.mobileOpen) {
                this.mobileTimeline.play();
            } else {
                this.mobileTimeline.reverse();
            }
        });
    }
}

function initTechCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => new TechCard(card));
}

document.addEventListener('DOMContentLoaded', initTechCards);
